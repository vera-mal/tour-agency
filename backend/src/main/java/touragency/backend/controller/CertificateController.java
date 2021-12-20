package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import touragency.backend.entity.Certificate;
import touragency.backend.service.CertificateService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("bellissimo/certificates")
@RequiredArgsConstructor
public class CertificateController {
    private final CertificateService certificateService;

    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateService.getAllCertificates();
    }
}
