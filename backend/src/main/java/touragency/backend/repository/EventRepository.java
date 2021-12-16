package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Event;
import touragency.backend.entity.Tour;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findFirstByTourOrderByDateAsc(Tour tour);
    List<Event> findAllByTour(Tour tour);
    Event findEventByTourAndAndDateBetween(Tour tour, LocalDateTime date1, LocalDateTime date2);
}
