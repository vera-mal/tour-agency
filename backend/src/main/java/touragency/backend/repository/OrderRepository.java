package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Client;
import touragency.backend.entity.Order;
import touragency.backend.entity.OrderStatus;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByClientAndStatus(Client client, OrderStatus status);
    List<Order> findAllByClientAndStatus(Client client, OrderStatus status);
}
