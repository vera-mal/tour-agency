package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.entity.Certificate;
import touragency.backend.repository.CertificateRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CertificateServiceImpl implements CertificateService {
    private final CertificateRepository certificateRepository;

    @Override
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }
}
