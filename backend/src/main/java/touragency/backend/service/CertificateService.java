package touragency.backend.service;

import touragency.backend.entity.Certificate;

import java.util.List;

public interface CertificateService {
    List<Certificate> getAllCertificates();

    void addCertificateToCart(Long userId, Long certificateId, Integer quantity);
}
