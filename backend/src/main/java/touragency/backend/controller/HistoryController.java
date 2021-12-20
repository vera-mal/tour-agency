package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.OrderDTO;
import touragency.backend.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/bellissimo")
public class HistoryController {
    private final UserService userService;

    @GetMapping("/users/{userId}/history")
    public List<OrderDTO> getHistory(@PathVariable Long userId) {
        return userService.getHistory(userId);
    }
}
