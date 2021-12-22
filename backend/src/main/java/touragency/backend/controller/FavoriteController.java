package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.ShortTourDTO;
import touragency.backend.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bellissimo/users")
@RequiredArgsConstructor
public class FavoriteController {
    private final UserService userService;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("{userId}/favorite/{tourId}")
    public void addTourToFavorite(@PathVariable Long userId, @PathVariable Long tourId) {
        userService.addTourToFavorite(userId, tourId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/{userId}/favorite")
    public List<ShortTourDTO> getFavoritesTours(@PathVariable Long userId) {
        return userService.getFavoriteTours(userId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("{userId}/favorite/{tourId}")
    public void deleteFavoriteTour(@PathVariable Long userId, @PathVariable Long tourId) {
        userService.deleteFavoriteTour(userId, tourId);
    }
}
