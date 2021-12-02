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
    private final String imagePath = "https://lh3.googleusercontent.com/proxy/FDfhV_aq3YlDbMs_IZe2tZnnP_A5RH8NwNIgventaMDZ3F00oy1kpfm-exXkW0Avszg3aOAnQemMkfQ27sevHyadbJAkngAHvwN8uoaMsn0WB1P9xbr8Ri3CWRRrSvJnbMvagLANgIoNkLI0kMz8DeAuScXL8zcRqVjZ1naze1tQDNbQUJ3eGlFJ";
}
