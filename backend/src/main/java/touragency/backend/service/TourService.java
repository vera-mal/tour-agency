package touragency.backend.service;

import touragency.backend.dto.FullTourDTO;
import touragency.backend.dto.TourDTO;

import java.util.List;

public interface TourService {
    List<TourDTO> getAllTours();
    List<TourDTO> getToursByCategoryName(String categoryName);
    FullTourDTO getTour(Long userId, Long tourId);
}
