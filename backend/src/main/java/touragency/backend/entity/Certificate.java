package touragency.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "certificate")
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "price", columnDefinition = "DECIMAL(12,2)")
    private BigDecimal price;

    @Column(name = "image_path")
    private final String imagePath = "https://amparus.ru/templates/yootheme/cache/20201217_125252_0000-87829d04.png";
}
