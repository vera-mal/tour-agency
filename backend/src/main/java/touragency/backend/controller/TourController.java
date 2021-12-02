package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import touragency.backend.dto.TourDTO;
import touragency.backend.service.TourService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bellissimo/tours")
public class TourController {
    private final TourService tourService;

    @GetMapping
    public List<TourDTO> getAllTours() {
        return tourService.getAllTours();
    }

    @GetMapping("/{categoryName}")
    public List<TourDTO> getToursByCategoryName(@PathVariable String categoryName) {
        return tourService.getToursByCategoryName(categoryName);
    }
}
