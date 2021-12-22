package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.Client;

@Repository
public interface UserRepository extends JpaRepository<Client, Long> {
    Client findByLogin(String login);
}
