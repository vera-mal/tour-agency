package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
