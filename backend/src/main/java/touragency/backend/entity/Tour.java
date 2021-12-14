package touragency.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tour")
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "images_path")
    private String imagesPath;

    @Column(name = "price", columnDefinition = "DECIMAL(12,2)")
    private BigDecimal price;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "tour_category",
               joinColumns = @JoinColumn(name = "tour_id"),
               inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;

    @JsonIgnore
    @OneToMany(mappedBy = "tour")
    private List<Event> events;
}
