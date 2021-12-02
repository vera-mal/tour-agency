package touragency.backend.service;

import touragency.backend.dto.TourDTO;

import java.util.List;

public interface TourService {
    List<TourDTO> getAllTours();
    List<TourDTO> getToursByCategoryName(String categoryName);
}
