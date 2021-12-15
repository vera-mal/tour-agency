package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
