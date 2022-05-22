package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.*;
import touragency.backend.entity.*;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.exception.TicketsNotAvailableException;
import touragency.backend.exception.TourIsNotFavoriteException;
import touragency.backend.repository.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final OrderRepository orderRepository;
    private final EventRepository eventRepository;
    private final DiscountRepository discountRepository;
    private final TourItemRepository tourItemRepository;
    private final CartItemRepository cartItemRepository;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDTO saveUser(UserRegistrationDTO userDTO) {
        Client newClient = new Client();
        newClient.setName(userDTO.getName());
        newClient.setSurname(userDTO.getSurname());
        newClient.setLogin(userDTO.getLogin());
        newClient.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.getById(1L));
        newClient.setRoles(roles);
        newClient = userRepository.save(newClient);

        Order newOrder = new Order(null, OrderStatus.NEW, LocalDateTime.now(), BigDecimal.ZERO,
                null, newClient, new ArrayList<>());
        orderRepository.save(newOrder);
        return new UserDTO(newClient.getId(), newClient.getName(), newClient.getSurname(), newClient.getLogin());
    }

    @Override
    @Transactional
    public void addTourToFavorite(Long userId, Long tourId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new EntityNotFoundException(Tour.class.getName(), tourId));

        List<Tour> favorites = client.getFavorites();
        favorites.add(tour);
        client.setFavorites(favorites);
        userRepository.save(client);
    }

    @Override
    public List<ShortTourDTO> getFavoriteTours(Long userId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));

        return client.getFavorites().stream().map(ShortTourDTO::convertTourToShortDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteFavoriteTour(Long userId, Long tourId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new EntityNotFoundException(Tour.class.getName(), tourId));

        List<Tour> favorites = client.getFavorites();
        if (!favorites.contains(tour)) {
            throw new TourIsNotFavoriteException(tour.getName(), client.getId());
        }

        favorites.remove(tour);
        client.setFavorites(favorites);
        userRepository.save(client);
    }

    @Override
    @Transactional
    public TourAddingDTO addTourToCart(TourAddingDTO tourDTO, Long userId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Tour tour = tourRepository.findById(tourDTO.getTourId())
                .orElseThrow(() -> new EntityNotFoundException(Tour.class.getName(), tourDTO.getTourId()));
        Event event = eventRepository.findEventByTourAndAndDateBetween(tour, tourDTO.getDate().atStartOfDay(),
                tourDTO.getDate().atTime(23, 59, 59));
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);

        AmountDTO amounts = tourDTO.getAmounts();
        Integer summ = amounts.getFull() + amounts.getMinors() + amounts.getSeniors();
        if (summ > event.getTicketAmount()) {
            throw new TicketsNotAvailableException(event.getTicketAmount());
        }
        event.setTicketAmount(event.getTicketAmount() - summ);

        TourItem[] tourItems = new TourItem[3];
        tourItems[0] = new TourItem(null, event, discountRepository.getById(1L),
                amounts.getFull(), tour.getPrice());
        tourItems[1] = new TourItem(null, event, discountRepository.getById(2L),
                amounts.getSeniors(), tour.getPrice().multiply(BigDecimal.valueOf(0.7)));
        tourItems[2] = new TourItem(null, event, discountRepository.getById(3L),
                amounts.getMinors(), tour.getPrice().multiply(BigDecimal.valueOf(0.5)));

        for (TourItem tourItem : tourItems) {
            if (tourItem != null) {
                tourItem = tourItemRepository.save(tourItem);
                CartItem cartItem = new CartItem(null, tourItem, null, order);
                cartItemRepository.save(cartItem);
                order.setTotalPrice(order.getTotalPrice().add(tourItem.getPrice().multiply(BigDecimal.valueOf(tourItem.getAmount()))));
            }
        }

        return tourDTO;
    }

    @Override
    public List<OrderDTO> getHistory(Long userId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        List<Order> orders = orderRepository.findAllByClientAndStatus(client, OrderStatus.PAID);
        return orders.stream().map(this::convertOrderToDTO).collect(Collectors.toList());
    }

    @Override
    public Long getIdByLogin(String login) {
        return userRepository.findByLogin(login).getId();
    }

    public OrderDTO convertOrderToDTO(Order order) {
        return new OrderDTO(order.getId(), order.getDate(), CartServiceImpl.getCartFromOrder(order));
    }
}
