package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Event;
import touragency.backend.entity.Tour;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findFirstByTourOrderByDateAsc(Tour tour);
}