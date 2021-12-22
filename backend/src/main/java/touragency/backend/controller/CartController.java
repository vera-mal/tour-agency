package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.*;
import touragency.backend.service.CartService;
import touragency.backend.service.CertificateService;
import touragency.backend.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/bellissimo")
public class CartController {
    private final UserService userService;
    private final CertificateService certificateService;
    private final CartService cartService;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping(value = "/users/{userId}/cart", consumes = {"application/json"})
    public TourAddingDTO addTourToCart(@PathVariable Long userId, @RequestBody TourAddingDTO tour) {
        return userService.addTourToCart(tour, userId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/users/{userId}/cart/certificate/{certificateId}/{quantity}")
    public void addCertificateToCart(@PathVariable Long userId,
                                     @PathVariable Long certificateId,
                                     @PathVariable Integer quantity) {
        certificateService.addCertificateToCart(userId, certificateId, quantity);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/users/{userId}/cart")
    public CartDTO getCart(@PathVariable Long userId) {
        return cartService.getCart(userId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/users/{userId}/cart/promocode/{promoCode}")
    public CartDTO applyPromoCode(@PathVariable Long userId, @PathVariable Integer promoCode) {
        return cartService.applyPromoCode(userId, promoCode);
    }
    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/users/{userId}/cart/submit")
    public List<PromocodeDTO> submitOrder(@PathVariable Long userId) {
        return cartService.submitOrder(userId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/users/{userId}/cart/{cartItemId}")
    public void deleteTourFromCart(@PathVariable Long userId, @PathVariable Long cartItemId) {
        cartService.deleteTourFromCart(userId, cartItemId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/users/{userId}/cart")
    public CartChangeDTO changeTicketQuantity(@PathVariable Long userId, @RequestBody TicketsQuantityDTO quantity) {
        return cartService.changeTicketQuantity(userId, quantity);
    }
}
