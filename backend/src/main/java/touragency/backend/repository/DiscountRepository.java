package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
