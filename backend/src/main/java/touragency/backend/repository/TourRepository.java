package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Tour;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
}
