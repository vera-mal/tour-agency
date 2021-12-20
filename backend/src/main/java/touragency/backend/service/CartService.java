package touragency.backend.service;

import touragency.backend.dto.CartDTO;
import touragency.backend.dto.PromocodeDTO;

public interface CartService {

    CartDTO getCart(Long userId);

    CartDTO applyPromoCode(Long userId, Integer promoCode);

    PromocodeDTO submitOrder(Long userId);
}
