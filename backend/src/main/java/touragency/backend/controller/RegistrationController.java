package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.UserDTO;
import touragency.backend.dto.UserRegistrationDTO;
import touragency.backend.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/bellissimo/user")
@RequiredArgsConstructor
public class RegistrationController {
    private final UserService userService;

    @PostMapping
    public UserDTO registerNewUser(@RequestBody UserRegistrationDTO user) {
        return userService.saveUser(user);
    }
}
