package touragency.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.util.Assert;
import touragency.backend.entity.Category;
import touragency.backend.repository.CategoryRepository;

import java.util.List;

public class CategoryServiceTest {
    private CategoryServiceImpl categoryService;
    private CategoryRepository categoryRepository;
    private Category category;

    @BeforeEach
    public void init() {
        categoryRepository = Mockito.mock(CategoryRepository.class);
        categoryService = new CategoryServiceImpl(categoryRepository);
        category = new Category(1L, "full", "полный");
    }

    @Test
    public void testSaveCategory() {
        categoryService.saveCategory(category);
        Mockito.verify(categoryRepository, Mockito.times(1)).save(category);
    }

    @Test
    public void testGetAllCategoriesEmpty() {
        Mockito.when(categoryRepository.findAll()).thenReturn(List.of());
        Assertions.assertTrue(categoryService.getAllCategories().isEmpty());
    }

    @Test
    public void testGetAllCategories() {
        Mockito.when(categoryRepository.findAll()).thenReturn(List.of(category));
        Assert.isInstanceOf(List.class, categoryService.getAllCategories());
        Assertions.assertEquals(1, categoryService.getAllCategories().size());
        Assertions.assertEquals(category, categoryService.getAllCategories().get(0));
    }
}
