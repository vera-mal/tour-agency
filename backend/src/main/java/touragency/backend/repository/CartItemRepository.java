package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import touragency.backend.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
