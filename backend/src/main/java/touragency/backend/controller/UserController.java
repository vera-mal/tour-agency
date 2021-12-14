package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import touragency.backend.service.UserService;

@RestController
@RequestMapping("/bellissimo/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("{userId}/favorite/{tourId}")
    public void addTourToFavorite(@PathVariable Long userId, @PathVariable Long tourId) {
        userService.addTourToFavorite(userId, tourId);
    }
}
