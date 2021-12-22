package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.FullTourDTO;
import touragency.backend.dto.TourDTO;
import touragency.backend.service.TourService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/bellissimo")
public class TourController {
    private final TourService tourService;

    @GetMapping("/tours")
    public List<TourDTO> getAllTours() {
        return tourService.getAllTours();
    }

    @GetMapping("/tours/{categoryName}")
    public List<TourDTO> getToursByCategoryName(@PathVariable String categoryName) {
        return tourService.getToursByCategoryName(categoryName);
    }

    @GetMapping("/users/{userId}/tours/{tourId}")
    public FullTourDTO getTour(@PathVariable Long userId, @PathVariable Long tourId) {
        return tourService.getTour(userId, tourId);
    }
}
