package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.TourAddingDTO;
import touragency.backend.service.UserService;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/bellissimo")
public class CartController {
    private final UserService userService;

    @PostMapping("/users/{userId}/cart")
    public TourAddingDTO addTourToCart(@PathVariable Long userId, @RequestBody TourAddingDTO tour) {
        return userService.addTourToCart(tour);
    }
}