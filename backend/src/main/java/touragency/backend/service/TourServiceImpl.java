package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.TourDTO;
import touragency.backend.entity.Tour;
import touragency.backend.repository.EventRepository;
import touragency.backend.repository.TourRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {
    private final TourRepository tourRepository;
    private final EventRepository eventRepository;

    @Override
    public List<TourDTO> getAllTours() {
        List<Tour> allTours = tourRepository.findAll();
        return allTours.stream()
                .map(this::convertTourToDTO)
                .collect(Collectors.toList());
    }

    TourDTO convertTourToDTO(Tour tour) {
        LocalDateTime nearestDate = eventRepository.findFirstByTourOrderByDateAsc(tour).getDate();
        return new TourDTO(tour.getId(), tour.getImagesPath(), tour.getName(), nearestDate, tour.getPrice());
    }
}
