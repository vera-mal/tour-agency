package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.UserDTO;
import touragency.backend.dto.UserRegistrationDTO;
import touragency.backend.entity.Client;
import touragency.backend.entity.Tour;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.repository.TourRepository;
import touragency.backend.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;

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

    @Override
    @Transactional
    public void addTourToFavorite(Long userId, Long tourId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new EntityNotFoundException(Tour.class.getName(), tourId));

        List<Tour> favorites = new ArrayList<>();
        favorites.add(tour);
        client.setFavorites(favorites);
        userRepository.save(client);
    }
}
