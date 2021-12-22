package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRegistrationDTO {
    String name;
    String surname;
    String login;
    String password;
    String repeatedPassword;
}