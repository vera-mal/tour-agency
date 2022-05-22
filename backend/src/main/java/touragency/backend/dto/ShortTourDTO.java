package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import touragency.backend.entity.Tour;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ShortTourDTO {
    private Long id;
    private String images;
    private String name;
    private BigDecimal price;

    public static ShortTourDTO convertTourToShortDTO(Tour tour) {
        return new ShortTourDTO(tour.getId(), tour.getImagesPath(), tour.getName(), tour.getPrice());
    }
}
