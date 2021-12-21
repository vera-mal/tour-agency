package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketsQuantityDTO {
    private Long cartItemId;
    private String ticketCategory;
    private Integer quantity;
}
