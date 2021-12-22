package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.*;
import touragency.backend.entity.*;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.exception.PromoCodeNotFoundException;
import touragency.backend.repository.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartServiceImpl implements CartService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final CertificateItemRepository certificateItemRepository;
    private final CartItemRepository cartItemRepository;
    private final TourItemRepository tourItemRepository;

    @Override
    public CartDTO getCart(Long userId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);
        return getCartFromOrder(order);
    }

    @Override
    @Transactional
    public CartDTO applyPromoCode(Long userId, Integer promoCode) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        CertificateItem certificateItem = certificateItemRepository.findByCodeAndUsedFalse(promoCode);
        if (certificateItem == null) {
            throw new PromoCodeNotFoundException(promoCode);
        }
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);

        Certificate certificate = certificateItem.getCertificate();
        if (certificate.getPrice().compareTo(order.getTotalPrice()) > 0) {
            order.setTotalPrice(BigDecimal.ZERO);
        } else {
            order.setTotalPrice(order.getTotalPrice().subtract(certificate.getPrice()));
        }

        order.setCertificateDiscount(certificate.getPrice());
        orderRepository.save(order);

        certificateItem.setUsed(true);
        certificateItemRepository.save(certificateItem);
        return getCart(userId);
    }

    @Override
    @Transactional
    public List<PromocodeDTO> submitOrder(Long userId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);

        order.setStatus(OrderStatus.PAID);
        order.setDate(LocalDateTime.now());
        orderRepository.save(order);

        Order newOrder = new Order(null, OrderStatus.NEW, LocalDateTime.now(), BigDecimal.ZERO,
                null, client, new ArrayList<>());
        orderRepository.save(newOrder);

        List<PromocodeDTO> promocodes = new ArrayList<>();
        for (CartItem cartItem : order.getCartItems()) {
            if (cartItem.getCertificateItem() != null) {
                PromocodeDTO promocode = new PromocodeDTO(cartItem.getCertificateItem().getCertificate().getPrice(),
                        cartItem.getCertificateItem().getCode());
                promocodes.add(promocode);
            }
        }
        return promocodes;
    }

    @Override
    @Transactional
    public void deleteTourFromCart(Long userId, Long cartItemId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new EntityNotFoundException(CartItem.class.getName(), cartItemId));
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);

        if (cartItem.getCertificateItem() != null) {
            cartItemRepository.delete(cartItem);
            order.setTotalPrice(order.getTotalPrice().subtract(cartItem.getCertificateItem().getCertificate().getPrice()));
        } else {
            Event event = cartItem.getTourItem().getEvent();
            for (CartItem item : order.getCartItems()) {
                if (item.getTourItem() != null && item.getTourItem().getEvent().getId().equals(event.getId())) {
                    cartItemRepository.delete(item);
                    tourItemRepository.delete(item.getTourItem());
                    order.setTotalPrice(order.getTotalPrice().subtract(item.getTourItem().getPrice()
                            .multiply(BigDecimal.valueOf(item.getTourItem().getAmount()))));
                }
            }
        }
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public CartChangeDTO changeTicketQuantity(Long userId, TicketsQuantityDTO quantity) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);
        CartItem cartItem = cartItemRepository.findById(quantity.getCartItemId())
                .orElseThrow(() -> new EntityNotFoundException(CartItem.class.getName(), quantity.getCartItemId()));
        Event event = cartItem.getTourItem().getEvent();

        for (CartItem item : order.getCartItems()) {
            TourItem tourItem = item.getTourItem();
            if (tourItem != null && tourItem.getDiscount().getName().equals(quantity.getTicketCategory())
                    && tourItem.getEvent().getId().equals(event.getId())) {
                BigDecimal sumDifference = tourItem.getPrice()
                        .multiply(BigDecimal.valueOf(tourItem.getAmount() - quantity.getQuantity()));
                tourItem.setAmount(quantity.getQuantity());
                tourItemRepository.save(tourItem);
                order.setTotalPrice(order.getTotalPrice().subtract(sumDifference));
                orderRepository.save(order);
                return new CartChangeDTO(order.getTotalPrice());
            }
        }
        return null;
    }

    public static CartDTO getCartFromOrder(Order order) {
        List<CartItemDTO> cartItems = new ArrayList<>();

        Event previousEvent = new Event();
        previousEvent.setId(0L);
        List<Item> items = new ArrayList<>();

        for (CartItem cartItem : order.getCartItems()) {
            if (cartItem.getTourItem() != null) { // если это тур
                TourItem tourItem = cartItem.getTourItem();
                Event event = tourItem.getEvent();
                if (!event.getId().equals(previousEvent.getId())) { // если первый элемент с такой датой
                    previousEvent = event;
                    CartItemDTO cartItemDTO = new CartItemDTO();
                    cartItemDTO.setCartItemId(cartItem.getId());
                    cartItemDTO.setType("tour");
                    Tour tour = event.getTour();

                    cartItemDTO.setLinksToImages(tour.getImagesPath());
                    cartItemDTO.setName(tour.getName());
                    cartItemDTO.setDate(event.getDate());

                    items = new ArrayList<>();
                    items.add(new Item(tourItem.getDiscount().getName(),
                            tourItem.getAmount(), tourItem.getPrice()));
                    cartItemDTO.setItems(items);

                    cartItemDTO.setFullPrice(tourItem.getPrice().multiply(BigDecimal.valueOf(tourItem.getAmount())));
                    cartItems.add(cartItemDTO);
                } else { // не первый элемент с такой датой, надо добавить в список предыдущего
                    items.add(new Item(tourItem.getDiscount().getName(), tourItem.getAmount(), tourItem.getPrice()));
                    CartItemDTO cartItemDTO = cartItems.get(cartItems.size() - 1);
                    cartItemDTO.setItems(items);
                    cartItemDTO.setFullPrice(cartItemDTO.getFullPrice()
                            .add(tourItem.getPrice().multiply(BigDecimal.valueOf(tourItem.getAmount()))));
                    cartItems.set(cartItems.size() - 1, cartItems.get(cartItems.size() - 1));
                }

            } else {    // добавили сертификат в корзину
                CartItemDTO cartItemDTO = new CartItemDTO();
                cartItemDTO.setCartItemId(cartItem.getId());
                cartItemDTO.setType("certificate");
                CertificateItem certificateItem = cartItem.getCertificateItem();
                Certificate certificate = certificateItem.getCertificate();

                cartItemDTO.setLinksToImages(certificate.getImagePath());
                cartItemDTO.setName("Сертификат на сумму " + certificate.getPrice() + " рублей");
                cartItemDTO.setFullPrice(certificate.getPrice());
                cartItems.add(cartItemDTO);
            }
        }
        return new CartDTO(cartItems, order.getCertificateDiscount(), order.getTotalPrice());
    }
}
