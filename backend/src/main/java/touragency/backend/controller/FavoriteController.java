package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.ShortTourDTO;
import touragency.backend.service.UserService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/bellissimo/users")
@RequiredArgsConstructor
public class FavoriteController {
    private final UserService userService;

    @PostMapping("{userId}/favorite/{tourId}")
    public void addTourToFavorite(@PathVariable Long userId, @PathVariable Long tourId) {
        userService.addTourToFavorite(userId, tourId);
    }

    @GetMapping("/{userId}/favorite")
    public List<ShortTourDTO> getFavoritesTours(@PathVariable Long userId) {
        return userService.getFavoriteTours(userId);
    }

    @DeleteMapping("{userId}/favorite/{tourId}")
    public void deleteFavoriteTour(@PathVariable Long userId, @PathVariable Long tourId) {
        userService.deleteFavoriteTour(userId, tourId);
    }
}
