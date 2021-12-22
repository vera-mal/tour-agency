package touragency.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import touragency.backend.entity.*;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.repository.*;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CertificateServiceImpl implements CertificateService {
    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;
    private final CertificateItemRepository certificateItemRepository;
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    @Override
    @Transactional
    public void addCertificateToCart(Long userId, Long certificateId, Integer quantity) {
        Client client = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(Client.class.getName(), userId));
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new EntityNotFoundException(Certificate.class.getName(), certificateId));
        Order order = orderRepository.findByClientAndStatus(client, OrderStatus.NEW);

        Random random = new Random();
        for (int i = 0; i < quantity; i++) {
            CertificateItem certificateItem = new CertificateItem(null,
                    random.nextInt(99999999), false, certificate);
            certificateItem = certificateItemRepository.save(certificateItem);
            cartItemRepository.save(new CartItem(null, null, certificateItem, order));
            order.setTotalPrice(order.getTotalPrice().add(certificate.getPrice()));
            orderRepository.save(order);
        }
    }
}
