package touragency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private List<CartItemDTO> cartItems;
    private BigDecimal certificateDiscount;
    private BigDecimal totalPrice;
}

