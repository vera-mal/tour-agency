package touragency.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(columnDefinition = "TIMESTAMP", name = "order_date")
    private LocalDateTime date;

    @Column(name = "total_price", columnDefinition = "DECIMAL(12,2)")
    private BigDecimal totalPrice = BigDecimal.valueOf(0);

    @Column(name = "certificate_discount", columnDefinition = "DECIMAL(12,2)")
    private BigDecimal certificateDiscount = BigDecimal.ZERO;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "order")
    private List<CartItem> cartItems;
}
