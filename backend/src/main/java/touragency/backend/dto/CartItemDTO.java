package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Long CartItemId;
    private String type;
    private String linksToImages;
    private String name;
    private LocalDateTime date;
    private List<Item> items;
    private BigDecimal fullPrice;
}
