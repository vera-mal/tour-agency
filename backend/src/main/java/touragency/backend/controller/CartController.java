package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.CartDTO;
import touragency.backend.dto.PromocodeDTO;
import touragency.backend.dto.TourAddingDTO;
import touragency.backend.service.CartService;
import touragency.backend.service.CertificateService;
import touragency.backend.service.UserService;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/bellissimo")
public class CartController {
    private final UserService userService;
    private final CertificateService certificateService;
    private final CartService cartService;

    @PostMapping(value = "/users/{userId}/cart", consumes = {"application/json"})
    public TourAddingDTO addTourToCart(@PathVariable Long userId, @RequestBody TourAddingDTO tour) {
        return userService.addTourToCart(tour, userId);
    }

    @PostMapping("/users/{userId}/cart/certificate/{certificateId}/{quantity}")
    public void addCertificateToCart(@PathVariable Long userId,
                                     @PathVariable Long certificateId,
                                     @PathVariable Integer quantity) {
        certificateService.addCertificateToCart(userId, certificateId, quantity);
    }

    @GetMapping("/users/{userId}/cart")
    public CartDTO getCart(@PathVariable Long userId) {
        return cartService.getCart(userId);
    }

    @PutMapping("/users/{userId}/cart/promocode/{promoCode}")
    public CartDTO applyPromoCode(@PathVariable Long userId, @PathVariable Integer promoCode) {
        return cartService.applyPromoCode(userId, promoCode);
    }

    @PostMapping("/users/{userId}/cart/submit")
    public PromocodeDTO submitOrder(@PathVariable Long userId) {
        return cartService.submitOrder(userId);
    }
}
