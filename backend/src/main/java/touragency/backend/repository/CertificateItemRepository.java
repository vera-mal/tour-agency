package touragency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import touragency.backend.entity.CertificateItem;

@Repository
public interface CertificateItemRepository extends JpaRepository<CertificateItem, Long> {
    CertificateItem findByCodeAndUsedFalse(Integer code);
}
