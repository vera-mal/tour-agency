package touragency.backend.service;

import touragency.backend.dto.ShortTourDTO;
import touragency.backend.dto.TourDTO;
import touragency.backend.dto.UserDTO;
import touragency.backend.dto.UserRegistrationDTO;

import java.util.List;

public interface UserService {
    UserDTO saveUser(UserRegistrationDTO client);
    void addTourToFavorite(Long userId, Long tourId);
    List<ShortTourDTO> getFavoriteTours(Long userId);
    void deleteFavoriteTour(Long userId, Long tourId);
}