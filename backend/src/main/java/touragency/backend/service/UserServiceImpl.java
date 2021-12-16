package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.ShortTourDTO;
import touragency.backend.dto.TourAddingDTO;
import touragency.backend.dto.UserDTO;
import touragency.backend.dto.UserRegistrationDTO;
import touragency.backend.entity.Client;
import touragency.backend.entity.Order;
import touragency.backend.entity.OrderStatus;
import touragency.backend.entity.Tour;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.exception.TourIsNotFavoriteException;
import touragency.backend.repository.OrderRepository;
import touragency.backend.repository.TourRepository;
import touragency.backend.repository.UserRepository;

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

    @Override
    @Transactional
    public UserDTO saveUser(UserRegistrationDTO userDTO) {
        Client newClient = new Client();
        newClient.setName(userDTO.getName());
        newClient.setSurname(userDTO.getSurname());
        newClient.setLogin(userDTO.getLogin());
        newClient.setPassword(passwordEncoder.encode(userDTO.getPassword()));
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
    public TourAddingDTO addTourToCart(TourAddingDTO tour) {
        return null;
    }
}
