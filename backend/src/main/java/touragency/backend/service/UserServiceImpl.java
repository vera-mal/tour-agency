package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.UserDTO;
import touragency.backend.dto.UserRegistrationDTO;
import touragency.backend.entity.Client;
import touragency.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDTO saveUser(UserRegistrationDTO userDTO) {
        Client newClient = new Client();
        newClient.setName(userDTO.getName());
        newClient.setSurname(userDTO.getSurname());
        newClient.setLogin(userDTO.getLogin());
        newClient.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newClient = userRepository.save(newClient);
        return new UserDTO(newClient.getId(), newClient.getName(), newClient.getSurname(), newClient.getLogin());
    }
}
