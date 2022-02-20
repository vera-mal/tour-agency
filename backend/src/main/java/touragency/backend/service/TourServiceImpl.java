package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.dto.DateDTO;
import touragency.backend.dto.FullTourDTO;
import touragency.backend.dto.PriceDTO;
import touragency.backend.dto.TourDTO;
import touragency.backend.entity.*;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.repository.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {
    private final TourRepository tourRepository;
    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final DiscountRepository discountRepository;

    @Override
    public List<TourDTO> getAllTours() {
        return tourRepository.findAll().stream()
                .map(this::convertTourToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TourDTO> getToursByCategoryName(String categoryName) {
        Category category = categoryRepository.findCategoryByEnglishName(categoryName);
        return tourRepository.findAllByCategoriesIsContaining(category).stream()
                .map(this::convertTourToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FullTourDTO getTour(Long userId, Long tourId) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new EntityNotFoundException(Tour.class.getName(), tourId));

        FullTourDTO fullTourDTO = new FullTourDTO();
        fullTourDTO.setImagesPath(tour.getImagesPath());
        fullTourDTO.setName(tour.getName());
        fullTourDTO.setDescription(tour.getDescription());
        fullTourDTO.setIsLiked(client.getFavorites().contains(tour));

        fullTourDTO.setDates(eventRepository.findAllByTour(tour)
                .stream()
                .map(e -> new DateDTO(e.getDate().toLocalDate(), e.getTicketAmount()))
                .collect(Collectors.toList()));
        fullTourDTO.setTime(tour.getEvents().get(0).getDate().toLocalTime());

        List<Discount> discounts = discountRepository.findAll();
        PriceDTO priceDTO = new PriceDTO(tour.getPrice().multiply(discounts.get(0).getCoefficient()),
                                         tour.getPrice().multiply(discounts.get(1).getCoefficient()),
                                         tour.getPrice().multiply(discounts.get(2).getCoefficient()));
        fullTourDTO.setPrices(priceDTO);
        return fullTourDTO;
    }

    TourDTO convertTourToDTO(Tour tour) {
        LocalDateTime nearestDate = eventRepository.findFirstByTourOrderByDateAsc(tour).getDate();
        return new TourDTO(tour.getId(), tour.getImagesPath(), tour.getName(), nearestDate, tour.getPrice());
    }
}
