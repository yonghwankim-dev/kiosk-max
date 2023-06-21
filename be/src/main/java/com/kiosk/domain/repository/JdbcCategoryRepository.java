package com.kiosk.domain.repository;

import com.kiosk.domain.entity.Category;
import com.kiosk.domain.entity.CategoryType;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcCategoryRepository implements CategoryRepository {

    private final JdbcTemplate template;

    public JdbcCategoryRepository(final JdbcTemplate template) {
        this.template = template;
    }

    @Override
    public Long save(final Category category) {
        template.update("INSERT INTO category(category_id, category_name) VALUES(?, ?)", category.getId(),
            category.getCategoryType().name());
        return category.getId();
    }

    @Override
    public List<Category> findAll() {
        return template.query("SELECT category_id, category_name FROM category", categoryRowMapper());
    }

    @Override
    public Optional<Category> findBy(final Long id) {
        return template.query("SELECT category_id, category_name FROM category WHERE category_id = ?",
                categoryRowMapper(), id).stream()
            .findAny();
    }

    @Override
    public Optional<Category> findBy(final String name) {
        return template.query("SELECT category_id, category_name FROM category WHERE category_name = ?",
                categoryRowMapper(), name).stream()
            .findAny();
    }

    @Override
    public int deleteAll() {
        return template.update("DELETE FROM category");
    }

    private RowMapper<Category> categoryRowMapper() {
        return (rs, rowNum) -> {
            return Category.builder()
                .id(rs.getLong("category_id"))
                .categoryType(CategoryType.resolve(rs.getString("category_name")))
                .build();
        };
    }
}
