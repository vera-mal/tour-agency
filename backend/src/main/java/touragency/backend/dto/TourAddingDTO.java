package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class TourAddingDTO {
    private Long tourId;
    private LocalDate date;
    private AmountDTO amounts;
}
