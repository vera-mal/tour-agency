package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import touragency.backend.entity.TourItem;

public interface TourItemRepository extends JpaRepository<TourItem, Long> {
}
