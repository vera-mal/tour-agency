package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.ShortTourDTO;
import touragency.backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/bellissimo/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("{userId}/favorite/{tourId}")
    public void addTourToFavorite(@PathVariable Long userId, @PathVariable Long tourId) {
        userService.addTourToFavorite(userId, tourId);
    }

    @GetMapping("/{userId}/favorite")
    public List<ShortTourDTO> getFavoritesTours(@PathVariable Long userId) {
        return userService.getFavoriteTours(userId);
    }
}
