package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import touragency.backend.entity.Tour;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class TourDTO {
    private Long id;
    private String images;
    private String name;
    private LocalDateTime nearestDate;
    private BigDecimal price;
}
