package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.CartDTO;
import touragency.backend.dto.CartItemDTO;
import touragency.backend.dto.Item;
import touragency.backend.entity.*;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.exception.PromoCodeNotFoundException;
import touragency.backend.repository.CertificateItemRepository;
import touragency.backend.repository.OrderRepository;
import touragency.backend.repository.UserRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartServiceImpl implements CartService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final CertificateItemRepository certificateItemRepository;

    @Override
    public CartDTO getCart(Long userId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);

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
                            tourItem.getAmount(), tourItem.getSum()));
                    cartItemDTO.setItems(items);

                    cartItemDTO.setFullPrice(tourItem.getSum());
                    cartItems.add(cartItemDTO);
                } else { // не первый элемент с такой датой, надо добавить в список предыдущего
                    items.add(new Item(tourItem.getDiscount().getName(), tourItem.getAmount(), tourItem.getSum()));
                    CartItemDTO cartItemDTO = cartItems.get(cartItems.size() - 1);
                    cartItemDTO.setItems(items);
                    cartItemDTO.setFullPrice(cartItemDTO.getFullPrice().add(tourItem.getSum()));
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

    @Override
    public CartDTO applyPromoCode(Long userId, Integer promoCode) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        CertificateItem certificateItem = certificateItemRepository.findByCode(promoCode);
        if (certificateItem == null) {
            throw new PromoCodeNotFoundException(promoCode);
        }
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);

        Certificate certificate = certificateItem.getCertificate();
        if (certificate.getPrice().compareTo(order.getCertificateDiscount()) > 0) {
            order.setTotalPrice(BigDecimal.ZERO);
        } else {
            order.setTotalPrice(order.getTotalPrice().subtract(certificate.getPrice()));
        }

        order.setCertificateDiscount(certificate.getPrice());
        orderRepository.save(order);
        certificateItemRepository.delete(certificateItem);

        return getCart(userId);
    }
}
