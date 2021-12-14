package touragency.backend.service;

import touragency.backend.dto.UserDTO;
import touragency.backend.dto.UserRegistrationDTO;
import touragency.backend.entity.Client;

public interface UserService {
     UserDTO saveUser(UserRegistrationDTO client);
}