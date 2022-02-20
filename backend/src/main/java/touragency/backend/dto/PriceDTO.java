package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
public class PriceDTO {
    private BigDecimal full;
    private BigDecimal seniors;
    private BigDecimal minors;
}
