package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.CartDTO;
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

    @PostMapping("/users/{userId}/cart")
    public TourAddingDTO addTourToCart(@PathVariable Long userId, @RequestBody TourAddingDTO tour) {
        return userService.addTourToCart(tour, userId);
    }

    @PostMapping("/users/{userId}/cart/certificate/{certificateId}")
    public void addCertificateToCart(@PathVariable Long userId, @PathVariable Long certificateId) {
        certificateService.addCertificateToCart(userId, certificateId);
    }

    @GetMapping("/users/{userId}/cart")
    public CartDTO getCart(@PathVariable Long userId) {
        return cartService.getCart(userId);
    }
}
