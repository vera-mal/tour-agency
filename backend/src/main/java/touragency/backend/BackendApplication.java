package touragency.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import touragency.backend.entity.Category;
import touragency.backend.service.CategoryService;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(CategoryService categoryService) {
        return (args) -> {
			categoryService.saveCategory(new Category(null, "boat-trips", "Водные прогулки"));
            categoryService.saveCategory(new Category(null, "walking-tours", "Пешие экскурсии"));
            categoryService.saveCategory(new Category(null, "bus-tours", "Автобусные экскурсии"));
            categoryService.saveCategory(new Category(null, "museums", "Музеи и выставки"));
            categoryService.saveCategory(new Category(null, "mystical-tours", "Мистические экскурсии"));
        };
    }
}
