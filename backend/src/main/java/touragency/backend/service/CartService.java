package touragency.backend.service;

import touragency.backend.dto.CartChangeDTO;
import touragency.backend.dto.CartDTO;
import touragency.backend.dto.PromocodeDTO;
import touragency.backend.dto.TicketsQuantityDTO;

import java.util.List;

public interface CartService {

    CartDTO getCart(Long userId);

    CartDTO applyPromoCode(Long userId, Integer promoCode);

    List<PromocodeDTO> submitOrder(Long userId);

    void deleteTourFromCart(Long userId, Long cartItemId);

    CartChangeDTO changeTicketQuantity(Long userId, TicketsQuantityDTO quantity);
}
