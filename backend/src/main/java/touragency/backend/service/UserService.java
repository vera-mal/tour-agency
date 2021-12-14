package touragency.backend.service;

import touragency.backend.dto.TourDTO;
import touragency.backend.dto.UserDTO;
import touragency.backend.dto.UserRegistrationDTO;

public interface UserService {
    UserDTO saveUser(UserRegistrationDTO client);
    void addTourToFavorite(Long userId, Long tourId);
}