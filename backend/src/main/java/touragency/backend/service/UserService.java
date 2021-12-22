package touragency.backend.service;

import touragency.backend.dto.*;

import java.util.List;

public interface UserService {
    UserDTO saveUser(UserRegistrationDTO client);

    void addTourToFavorite(Long userId, Long tourId);

    List<ShortTourDTO> getFavoriteTours(Long userId);

    void deleteFavoriteTour(Long userId, Long tourId);

    TourAddingDTO addTourToCart(TourAddingDTO tourDTO, Long userId);

    List<OrderDTO> getHistory(Long userId);

    Long getIdByLogin(String login);
}