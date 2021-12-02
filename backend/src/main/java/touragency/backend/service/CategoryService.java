package touragency.backend.service;

import touragency.backend.entity.Category;

import java.util.List;

public interface CategoryService {
    void saveCategory(Category category);
    List<Category> getAllCategories();
}
