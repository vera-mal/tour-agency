package touragency.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import touragency.backend.entity.Category;
import touragency.backend.entity.Certificate;
import touragency.backend.entity.Event;
import touragency.backend.entity.Tour;
import touragency.backend.repository.CertificateRepository;
import touragency.backend.repository.EventRepository;
import touragency.backend.repository.TourRepository;
import touragency.backend.service.CategoryService;
import touragency.backend.service.TourService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(CategoryService categoryService, TourRepository tourRepository,
								  EventRepository eventRepository, CertificateRepository certificateRepository) {
		return (args) -> {
			Category category1 = new Category(null, "boat-trips", "Водные прогулки");
			Category category2 = new Category(null, "walking-tours", "Пешие экскурсии");
			Category category3 = new Category(null, "bus-tours", "Автобусные экскурсии");
			Category category4 = new Category(null, "museums", "Музеи и выставки");
			Category category5 = new Category(null, "mystical-tours", "Мистические экскурсии");
			categoryService.saveCategory(category1);
			categoryService.saveCategory(category2);
			categoryService.saveCategory(category3);
			categoryService.saveCategory(category4);
			categoryService.saveCategory(category5);

			ArrayList<Category> categories = new ArrayList<>();
			categories.add(category1);
			Tour tour = new Tour(null, "Экскурсия под Аничковым мостом,",
					"On the other hand, we denounce with righteous indignation " +
							"and dislike men who are so beguiled and demoralized by the charms of " +
							"pleasure of the moment, so blinded by desire, that they cannot foresee the" +
							" pain and trouble that are bound to ensue; and equal blame belongs to those" +
							" who fail in their duty through weakness of will, which is the same as saying " +
							"through shrinking from toil and pain. These cases are perfectly simple and easy to" +
							" distinguish. In a free hour, when our power of choice is untrammelled and when nothing " +
							"prevents our being able to do what we like best, every pleasure is to be welcomed and every" +
							" pain avoided. But in certain circumstances and owing to the claims of duty or the " +
							"obligations of business it will frequently occur that pleasures have to be repudiated " +
							"and annoyances accepted. The wise man therefore always holds in these matters to this " +
							"principle of selection: he rejects pleasures to secure other greater pleasures, or else " +
							"he endures pains to avoid worse pains.",
					"https://2klass.ru/sites/default/files/field/image/anichkov_most_foto_18_14200034.jpg;" +
							"https://i1.wp.com/palmernw.ru/mir-piter/anichkov_most/anichkov_003.jpg",
					new BigDecimal(1000), categories, null);
			tourRepository.save(tour);

			Event event1 = new Event(null, tour, LocalDateTime.now().plusDays(5), 20);
			Event event2 = new Event(null, tour, LocalDateTime.now().plusDays(10), 20);
			eventRepository.save(event1);
			eventRepository.save(event2);

			Certificate certificate1 = new Certificate(null, BigDecimal.valueOf(1000));
			Certificate certificate2 = new Certificate(null, BigDecimal.valueOf(3000));
			Certificate certificate3 = new Certificate(null, BigDecimal.valueOf(5000));
			certificateRepository.save(certificate1);
			certificateRepository.save(certificate2);
			certificateRepository.save(certificate3);
		};
	}
}
