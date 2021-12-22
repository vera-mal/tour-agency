package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class AmountDTO {
    private Integer full;
    private Integer seniors;
    private Integer minors;
}
