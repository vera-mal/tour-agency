package touragency.backend.service;

import touragency.backend.dto.CartDTO;
import touragency.backend.dto.PromocodeDTO;
import touragency.backend.dto.TicketsQuantityDTO;

public interface CartService {

    CartDTO getCart(Long userId);

    CartDTO applyPromoCode(Long userId, Integer promoCode);

    PromocodeDTO submitOrder(Long userId);

    void deleteTourFromCart(Long userId, Long cartItemId);

    void changeTicketQuantity(Long userId, TicketsQuantityDTO quantity);
}
