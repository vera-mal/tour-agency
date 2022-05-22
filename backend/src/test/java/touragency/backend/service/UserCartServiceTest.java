package touragency.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import touragency.backend.BackendApplication;
import touragency.backend.dto.*;
import touragency.backend.entity.*;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.exception.PromoCodeNotFoundException;
import touragency.backend.exception.TicketsNotAvailableException;
import touragency.backend.exception.TourIsNotFavoriteException;
import touragency.backend.repository.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserCartServiceTest {
    private UserRepository userRepository;
    private TourRepository tourRepository;
    private OrderRepository orderRepository;
    private EventRepository eventRepository;
    private DiscountRepository discountRepository;
    private TourItemRepository tourItemRepository;
    private CartItemRepository cartItemRepository;
    private CertificateItemRepository certificateItemRepository;
    private RoleRepository roleRepository;
    private UserServiceImpl userService;
    private CartServiceImpl cartService;
    private Category category;
    private Tour tour;
    private TourItem tourItem;
    private CartItem cartItem;
    private Discount discount;
    private Event event;
    private Client client;
    private TourAddingDTO tourAddingDTO;
    private Order order;
    private Certificate certificate;
    private Certificate certificate1;
    private CertificateItem certificateItem;
    private CertificateItem certificateItem1;

    @BeforeEach
    public void init() {
        userRepository = Mockito.mock(UserRepository.class);
        tourRepository = Mockito.mock(TourRepository.class);
        orderRepository = Mockito.mock(OrderRepository.class);
        eventRepository = Mockito.mock(EventRepository.class);
        discountRepository = Mockito.mock(DiscountRepository.class);
        tourItemRepository = Mockito.mock(TourItemRepository.class);
        cartItemRepository = Mockito.mock(CartItemRepository.class);
        roleRepository = Mockito.mock(RoleRepository.class);
        certificateItemRepository = Mockito.mock(CertificateItemRepository.class);
        userService = new UserServiceImpl(new BCryptPasswordEncoder(10), userRepository, tourRepository,
                orderRepository, eventRepository, discountRepository, tourItemRepository, cartItemRepository, roleRepository);
        cartService = new CartServiceImpl(userRepository, orderRepository, certificateItemRepository, cartItemRepository,
                tourItemRepository);
        List<Category> categories = List.of(new Category(1L, "water", "водные"));
        event = new Event(1L, null, LocalDateTime.of(2022, 3, 25,
                10, 0), 10);
        List<Event> events = List.of(event);
        tour = new Tour(1L, "testTour", "Good tour", "link", BigDecimal.valueOf(500L),
                categories, events);
        event.setTour(tour);
        discount = new Discount(1L, "full", BigDecimal.valueOf(0.8));
        tourItem = new TourItem(1L, event, discount, 10, BigDecimal.valueOf(1000));
        cartItem = new CartItem(1L, tourItem, null, order);
        List<Tour> favorites = new ArrayList<>();
        favorites.add(tour);
        client = new Client(1L, "pavel", "smirnov", "smpas", "1234", null, favorites, null);
        tourAddingDTO = new TourAddingDTO(tour.getId(), LocalDate.of(2022, 3, 25), new AmountDTO(2, 1, 0));
        order = new Order();
        order.setId(1L);
        order.setStatus(OrderStatus.NEW);
        order.setTotalPrice(BigDecimal.valueOf(1000));
        order.setCartItems(List.of(cartItem));
        certificate = new Certificate(1L, BigDecimal.valueOf(500));
        certificateItem = new CertificateItem(1L, 1234, false, certificate);
        certificate1 = new Certificate(1L, BigDecimal.valueOf(1500));
        certificateItem1 = new CertificateItem(1L, 1111, false, certificate1);
    }

    @Test
    public void testSaveUser() {
        Mockito.when(roleRepository.getById(Mockito.any())).thenReturn(new Role(1L, "user"));
        UserRegistrationDTO userRegistrationDTO = new UserRegistrationDTO("Pavel", "Smirnov",
                "smpas", "1234", "1234");
        Mockito.when(userRepository.save(Mockito.any())).thenReturn(new Client(1L, userRegistrationDTO.getName(),
                userRegistrationDTO.getSurname(), userRegistrationDTO.getLogin(), userRegistrationDTO.getPassword(),
                null, null, null));
        UserDTO userDTO = userService.saveUser(userRegistrationDTO);
        Mockito.verify(orderRepository, Mockito.times(1)).save(Mockito.any());
        Assertions.assertEquals(userRegistrationDTO.getName(), userDTO.getName());
        Assertions.assertEquals(userRegistrationDTO.getSurname(), userDTO.getSurname());
        Assertions.assertEquals(userRegistrationDTO.getLogin(), userDTO.getUsername());
    }

    @Test
    public void testAddTourToFavoriteClientException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        Assertions.assertThrows(EntityNotFoundException.class, () -> userService.addTourToFavorite(1L, 1L));
    }

    @Test
    public void testAddTourToFavoriteTourException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Assertions.assertThrows(EntityNotFoundException.class, () -> userService.addTourToFavorite(1L, 1L));
    }

    @Test
    public void testAddTourToFavorite() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        Mockito.when(userRepository.save(Mockito.any())).thenReturn(client);
        userService.addTourToFavorite(1L, 1L);
        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    public void testGetFavoriteTours() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Assertions.assertEquals(1, userService.getFavoriteTours(1L).size());
        Assertions.assertEquals(ShortTourDTO.convertTourToShortDTO(tour), userService.getFavoriteTours(1L).get(0));
    }

    @Test
    public void testGetFavoriteToursEmpty() {
        client.setFavorites(List.of());
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Assertions.assertEquals(0, userService.getFavoriteTours(1L).size());
    }

    @Test
    public void testGetFavoriteToursClientException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Assertions.assertThrows(EntityNotFoundException.class, () -> userService.getFavoriteTours(1L));
    }

    @Test
    public void deleteFavoriteTourClientException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        Assertions.assertThrows(EntityNotFoundException.class, () -> userService.deleteFavoriteTour(1L, 1L));
    }

    @Test
    public void deleteFavoriteTourTourException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Assertions.assertThrows(EntityNotFoundException.class, () -> userService.deleteFavoriteTour(1L, 1L));
    }

    @Test
    public void deleteFavoriteTourNotFavorite() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        client.setFavorites(List.of());
        Assertions.assertThrows(TourIsNotFavoriteException.class, () -> userService.deleteFavoriteTour(1L, 1L));
    }

    @Test
    public void deleteFavoriteTour() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        userService.deleteFavoriteTour(1L, 1L);
        Mockito.verify(userRepository, Mockito.times(1)).save(client);
    }

    @Test
    public void testAddTourToCartClientException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        Assertions.assertThrows(EntityNotFoundException.class, () -> userService.addTourToCart(tourAddingDTO, 1L));
    }

    @Test
    public void testAddTourToCartTourException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Assertions.assertThrows(EntityNotFoundException.class, () -> userService.addTourToCart(tourAddingDTO, 1L));
    }

    @Test
    public void testAddTourToCartTicketsNotAvailableException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        Mockito.when(eventRepository.findEventByTourAndAndDateBetween(Mockito.any(), Mockito.any(), Mockito.any()))
                .thenReturn(event);
        tourAddingDTO.setAmounts(new AmountDTO(5, 6, 1));
        Assertions.assertThrows(TicketsNotAvailableException.class, () -> userService.addTourToCart(tourAddingDTO, 1L));
    }

    @Test
    public void testAddTourToCartTickets() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(tour));
        Mockito.when(eventRepository.findEventByTourAndAndDateBetween(Mockito.any(), Mockito.any(), Mockito.any()))
                .thenReturn(event);
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        TourItem tourItem = new TourItem();
        tourItem.setAmount(2);
        tourItem.setPrice(BigDecimal.valueOf(1000L));
        Mockito.when(tourItemRepository.save(Mockito.any())).thenReturn(tourItem);
        TourAddingDTO tourDTO = userService.addTourToCart(tourAddingDTO, 1L);

        Mockito.verify(tourItemRepository, Mockito.times(3)).save(Mockito.any());
        Mockito.verify(cartItemRepository, Mockito.times(3)).save(Mockito.any());
        Assertions.assertEquals(tour.getId(), tourDTO.getTourId());
        Assertions.assertEquals(event.getDate().toLocalDate(), tourDTO.getDate());
        Assertions.assertEquals(tourAddingDTO.getAmounts().getFull(), tourDTO.getAmounts().getFull());
        Assertions.assertEquals(tourAddingDTO.getAmounts().getMinors(), tourDTO.getAmounts().getMinors());
        Assertions.assertEquals(tourAddingDTO.getAmounts().getSeniors(), tourDTO.getAmounts().getSeniors());
    }

    @Test
    public void testGetHistory() {
        order.setStatus(OrderStatus.PAID);
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(orderRepository.findAllByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(List.of(order));
        List<OrderDTO> orders = userService.getHistory(1L);
        Assertions.assertEquals(1, orders.size());
    }

    @Test
    public void testGetIdByLogin() {
        String login = "smpas";
        Mockito.when(userRepository.findByLogin(login)).thenReturn(client);
        Long getId = userService.getIdByLogin(login);
        Assertions.assertEquals(1L, getId);
    }

    @Test
    public void testGetCart() {
        CartItem cartItem2 = new CartItem(1L, null, certificateItem, order);
        CartItem cartItem3 = new CartItem(1L, new TourItem(tourItem.getId(), tourItem.getEvent(), tourItem.getDiscount(),
                tourItem.getAmount(), tourItem.getPrice()), null, order);
        order.setCartItems(List.of(cartItem, cartItem2, cartItem3));
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(orderRepository.findByClientAndStatus(client, OrderStatus.NEW)).thenReturn(order);
        CartDTO cartDTO = cartService.getCart(1L);
        Assertions.assertEquals(1000, cartDTO.getTotalPrice().intValue());
    }

    @Test
    public void testApplyPromoCode() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(certificateItemRepository.findByCodeAndUsedFalse(Mockito.any())).thenReturn(certificateItem);
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        cartService.applyPromoCode(1L, 1234);
        Assertions.assertEquals(BigDecimal.valueOf(500), order.getCertificateDiscount());
    }

    @Test
    public void testApplyPromoCodeNotFound() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(certificateItemRepository.findByCodeAndUsedFalse(Mockito.any())).thenReturn(null);
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        Assertions.assertThrows(PromoCodeNotFoundException.class, () -> cartService.applyPromoCode(1L, 1235));
        Assertions.assertEquals(BigDecimal.valueOf(0), order.getCertificateDiscount());
    }

    @Test
    public void testApplyLargePromoCode() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(certificateItemRepository.findByCodeAndUsedFalse(Mockito.any())).thenReturn(certificateItem1);
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        cartService.applyPromoCode(1L, 1111);
        Assertions.assertEquals(BigDecimal.valueOf(1500), order.getCertificateDiscount());
        Assertions.assertEquals(BigDecimal.valueOf(0), order.getTotalPrice());
    }

    @Test
    public void testSubmitOrder() {
        cartItem.setCertificateItem(certificateItem);
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        cartService.submitOrder(1L);
        Mockito.verify(orderRepository, Mockito.times(2)).save(Mockito.any());
        Assertions.assertEquals(OrderStatus.PAID, order.getStatus());
    }

    @Test
    public void testDeleteTourFromCart() throws Exception {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(cartItemRepository.findById(Mockito.any())).thenReturn(Optional.of(cartItem));
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        cartService.deleteTourFromCart(1L, 1L);
        Assertions.assertEquals(BigDecimal.valueOf(-9000), order.getTotalPrice());
        Mockito.when(userRepository.save(Mockito.any())).thenReturn(client);
        userService = Mockito.mock(UserServiceImpl.class);
        Mockito.doNothing().when(userService).addTourToFavorite(Mockito.any(), Mockito.any());
        BackendApplication backendApplication = new BackendApplication();
        backendApplication.demo(Mockito.mock(CategoryServiceImpl.class), tourRepository, eventRepository,
                Mockito.mock(CertificateRepository.class), userService,
                discountRepository, certificateItemRepository, roleRepository).run();
    }

    @Test
    public void testDeleteCertificateFromCart() {
        cartItem = new CartItem(2L, null, certificateItem, order);
        order.setCartItems(List.of(cartItem));
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(cartItemRepository.findById(Mockito.any())).thenReturn(Optional.of(cartItem));
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        cartService.deleteTourFromCart(1L, 2L);
        Assertions.assertEquals(BigDecimal.valueOf(500), order.getTotalPrice());
    }

    @Test
    public void testChangeTicketQuantity() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(cartItemRepository.findById(Mockito.any())).thenReturn(Optional.of(cartItem));
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        cartService.changeTicketQuantity(1L, new TicketsQuantityDTO(1L, "full", 3));
        Mockito.verify(tourItemRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(orderRepository, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    public void testChangeZeroTicketQuantity() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(cartItemRepository.findById(Mockito.any())).thenReturn(Optional.of(cartItem));
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        order.setCartItems(List.of());
        cartService.changeTicketQuantity(1L, new TicketsQuantityDTO(1L, "full", 3));
        Mockito.verify(tourItemRepository, Mockito.times(0)).save(Mockito.any());
        Mockito.verify(orderRepository, Mockito.times(0)).save(Mockito.any());
    }
}