package touragency.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import touragency.backend.entity.Certificate;
import touragency.backend.entity.Client;
import touragency.backend.entity.Order;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.repository.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public class CertificateServiceTest {
    private CertificateServiceImpl certificateService;
    private CertificateRepository certificateRepository;
    private UserRepository userRepository;
    private CertificateItemRepository certificateItemRepository;
    private OrderRepository orderRepository;
    private CartItemRepository cartItemRepository;
    private Certificate certificate;
    private Client client;
    private Order order;

    @BeforeEach
    public void init() {
        certificateRepository = Mockito.mock(CertificateRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        certificateItemRepository = Mockito.mock(CertificateItemRepository.class);
        orderRepository = Mockito.mock(OrderRepository.class);
        cartItemRepository = Mockito.mock(CartItemRepository.class);
        certificateService = new CertificateServiceImpl(certificateRepository, userRepository,
                certificateItemRepository, orderRepository, cartItemRepository);
        certificate = new Certificate(1L, BigDecimal.valueOf(1000));
        client = new Client();
        order = new Order();
        order.setTotalPrice(BigDecimal.valueOf(2000));
    }

    @Test
    public void testGetAllCertificatesEmpty() {
        Mockito.when(certificateRepository.findAll()).thenReturn(List.of());
        Assertions.assertEquals(0, certificateService.getAllCertificates().size());
    }

    @Test
    public void testGetAllCertificatesNotEmpty() {
        Mockito.when(certificateRepository.findAll()).thenReturn(List.of(certificate));
        Assertions.assertEquals(1, certificateService.getAllCertificates().size());
        Assertions.assertEquals(certificate, certificateService.getAllCertificates().get(0));
    }

    @Test
    public void testAddCertificateToCartClientException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Mockito.when(certificateRepository.findById(Mockito.any())).thenReturn(Optional.of(certificate));
        Assertions.assertThrows(EntityNotFoundException.class,
                () -> certificateService.addCertificateToCart(1L, 1L, 1));
    }

    @Test
    public void testAddCertificateToCartCertificateException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(certificateRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Assertions.assertThrows(EntityNotFoundException.class,
                () -> certificateService.addCertificateToCart(1L, 1L, 1));
    }

    @Test
    public void testAddCertificateToCart() {
        Mockito.when(certificateRepository.findById(Mockito.any())).thenReturn(Optional.of(certificate));
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(orderRepository.findByClientAndStatus(Mockito.any(), Mockito.any())).thenReturn(order);
        certificateService.addCertificateToCart(1L, 1L, 1);
        Mockito.verify(certificateItemRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(cartItemRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(orderRepository, Mockito.times(1)).save(order);
    }
}
