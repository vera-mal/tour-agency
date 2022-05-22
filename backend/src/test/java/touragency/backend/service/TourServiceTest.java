package touragency.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.util.Assert;
import touragency.backend.dto.FullTourDTO;
import touragency.backend.dto.PriceDTO;
import touragency.backend.dto.TourDTO;
import touragency.backend.entity.*;
import touragency.backend.exception.EntityNotFoundException;
import touragency.backend.repository.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TourServiceTest {
    Tour testTour;
    Event event;
    Category category;
    Client client;
    TourServiceImpl tourService;
    TourRepository tourRepository;
    EventRepository eventRepository;
    CategoryRepository categoryRepository;
    UserRepository userRepository;
    DiscountRepository discountRepository;

    @BeforeEach
    public void init() {
        category = new Category(1L, "water", "водные");
        List<Category> categories = new ArrayList<>();
        categories.add(category);
        event = new Event(1L, null, LocalDateTime.of(2022, 3, 25, 10, 0), 10);
        List<Event> events = new ArrayList<>();
        events.add(event);
        testTour = new Tour(1L, "testTour", "Good tour", "link", BigDecimal.valueOf(500L), categories, events);
        event.setTour(testTour);
        List<Tour> favorites = new ArrayList<>();
        favorites.add(testTour);
        client = new Client(1L, "pavel", "smirnov", "smpas", "1234", null, favorites, null);

        eventRepository = Mockito.mock(EventRepository.class);
        Mockito.when(eventRepository.findFirstByTourOrderByDateAsc(Mockito.any())).thenReturn(event);
        tourRepository = Mockito.mock(TourRepository.class);
        categoryRepository = Mockito.mock(CategoryRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        discountRepository = Mockito.mock(DiscountRepository.class);
        tourService = new TourServiceImpl(tourRepository, eventRepository, categoryRepository, userRepository, discountRepository);
    }

    @Test
    public void testConvertTourToDTO() {
        Assert.isInstanceOf(TourDTO.class, tourService.convertTourToDTO(testTour));
        TourDTO tourDTO = tourService.convertTourToDTO(testTour);
        Assertions.assertEquals(testTour.getId(), tourDTO.getId());
        Assertions.assertEquals(testTour.getImagesPath(), tourDTO.getImages());
        Assertions.assertEquals(testTour.getName(), tourDTO.getName());
        Assertions.assertEquals(eventRepository.findFirstByTourOrderByDateAsc(testTour).getDate(), tourDTO.getNearestDate());
        Assertions.assertEquals(testTour.getPrice(), tourDTO.getPrice());
    }

    @Test
    public void testGetAllToursEmpty() {
        Mockito.when(tourRepository.findAll()).thenReturn(new ArrayList<>());
        Assertions.assertEquals(0, tourService.getAllTours().size());
    }

    @Test
    public void testGetAllToursNotEmpty() {
        List<Tour> tours = new ArrayList<>();
        tours.add(testTour);
        Mockito.when(tourRepository.findAll()).thenReturn(tours);
        List<TourDTO> tourDTOS = tourService.getAllTours();
        Assertions.assertEquals(1, tourDTOS.size());

        TourDTO tourDTO = tourDTOS.get(0);
        Assertions.assertEquals(testTour.getId(), tourDTO.getId());
        Assertions.assertEquals(testTour.getImagesPath(), tourDTO.getImages());
        Assertions.assertEquals(testTour.getName(), tourDTO.getName());
        Assertions.assertEquals(eventRepository.findFirstByTourOrderByDateAsc(testTour).getDate(), tourDTO.getNearestDate());
        Assertions.assertEquals(testTour.getPrice(), tourDTO.getPrice());
    }

    @Test
    public void testGetToursByCategoryNameNotExist() {
        Mockito.when(tourRepository.findAllByCategoriesIsContaining(Mockito.any())).thenReturn(new ArrayList<>());
        Assertions.assertEquals(0, tourService.getToursByCategoryName(category.getEnglishName()).size());
    }

    @Test
    public void testGetToursByCategoryNameExist() {
        List<Tour> tours = new ArrayList<>();
        tours.add(testTour);
        Mockito.when(tourRepository.findAllByCategoriesIsContaining(Mockito.any())).thenReturn(tours);
        List<TourDTO> tourDTOS = tourService.getToursByCategoryName(category.getEnglishName());
        Assertions.assertEquals(1, tourDTOS.size());

        TourDTO tourDTO = tourDTOS.get(0);
        Assertions.assertEquals(testTour.getId(), tourDTO.getId());
        Assertions.assertEquals(testTour.getImagesPath(), tourDTO.getImages());
        Assertions.assertEquals(testTour.getName(), tourDTO.getName());
        Assertions.assertEquals(eventRepository.findFirstByTourOrderByDateAsc(testTour).getDate(), tourDTO.getNearestDate());
        Assertions.assertEquals(testTour.getPrice(), tourDTO.getPrice());
    }

    @Test
    public void testGetTour() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(testTour));
        Mockito.when(eventRepository.findAllByTour(Mockito.any())).thenReturn(List.of(event));
        List<Discount> discounts = List.of(new Discount(1L, "full", BigDecimal.valueOf(1)),
                new Discount(2L, "child", BigDecimal.valueOf(0.7)),
                new Discount(3L, "senior", BigDecimal.valueOf(0.5)));
        Mockito.when(discountRepository.findAll()).thenReturn(discounts);

        FullTourDTO dto = tourService.getTour(client.getId(), testTour.getId());
        Assertions.assertEquals(testTour.getImagesPath(), dto.getImagesPath());
        Assertions.assertEquals(testTour.getName(), dto.getName());
        Assertions.assertEquals(testTour.getDescription(), dto.getDescription());
        Assertions.assertTrue(dto.getIsLiked());
        Assertions.assertEquals(1, dto.getDates().size());

        Event event = eventRepository.findAllByTour(testTour).get(0);
        Assertions.assertEquals(event.getDate().toLocalDate(), dto.getDates().get(0).getDate());
        Assertions.assertEquals(event.getTicketAmount(), dto.getDates().get(0).getTicketAmount());
        Assertions.assertEquals(event.getDate().toLocalTime(), dto.getTime());

        PriceDTO priceDTO = new PriceDTO(testTour.getPrice().multiply(discounts.get(0).getCoefficient()),
                testTour.getPrice().multiply(discounts.get(1).getCoefficient()),
                testTour.getPrice().multiply(discounts.get(2).getCoefficient()));
        Assertions.assertEquals(priceDTO, dto.getPrices());
    }

    @Test
    public void testGetTourWithClientException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.of(testTour));
        Assertions.assertThrows(EntityNotFoundException.class, () -> tourService.getTour(1L, 1L));
    }

    @Test
    public void testGetTourWithTourException() {
        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(tourRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Assertions.assertThrows(EntityNotFoundException.class, () -> tourService.getTour(1L, 1L));
    }
}
