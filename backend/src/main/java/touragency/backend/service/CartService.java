package touragency.backend.service;

import touragency.backend.dto.CartDTO;

public interface CartService {

    CartDTO getCart(Long userId);
}
