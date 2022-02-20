package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FullTourDTO {
    private String imagesPath;
    private String name;
    private String description;
    private Boolean isLiked;
    private List<DateDTO> dates;
    private LocalTime time;
    private PriceDTO prices;
}
