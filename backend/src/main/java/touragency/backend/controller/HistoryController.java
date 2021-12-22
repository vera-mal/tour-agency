package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.OrderDTO;
import touragency.backend.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/bellissimo")
public class HistoryController {
    private final UserService userService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/users/{userId}/history")
    public List<OrderDTO> getHistory(@PathVariable Long userId) {
        return userService.getHistory(userId);
    }
}
