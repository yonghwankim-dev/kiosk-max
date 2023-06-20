package com.kiosk.domain.repository;

import com.kiosk.domain.entity.Category;
import java.util.Optional;

public interface CategoryRepository {

    Long save(Category category);

    Optional<Category> findBy(Long id);

    Optional<Category> findBy(String name);

    int deleteAll();
}
