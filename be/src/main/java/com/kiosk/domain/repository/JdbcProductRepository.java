package com.kiosk.domain.repository;

import com.kiosk.domain.entity.Category;
import com.kiosk.domain.entity.CategoryType;
import com.kiosk.domain.entity.Product;
import com.kiosk.web.controller.dto.ProductDto;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public class JdbcProductRepository implements ProductRepository {

    private final JdbcTemplate template;
    private final CategoryRepository categoryRepository;

    public JdbcProductRepository(final JdbcTemplate template, final CategoryRepository categoryRepository) {
        this.template = template;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Long save(final ProductDto dto) {
        template.update(connection -> {
            Category category = categoryRepository.findBy(dto.getCategory().getCategoryType().name())
                .orElseThrow();
            PreparedStatement ps = connection.prepareStatement(
                "INSERT INTO product(product_id, product_name, product_price, product_image, product_is_best, product_has_hot, "
                    + "product_has_ice, product_has_large, product_has_small, category_id) "
                    + "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setLong(1, dto.getId());
            ps.setString(2, dto.getName());
            ps.setLong(3, dto.getPrice());
            ps.setString(4, dto.getImage());
            ps.setBoolean(5, dto.isBest());
            ps.setBoolean(6, dto.isHasHot());
            ps.setBoolean(7, dto.isHasIce());
            ps.setBoolean(8, dto.isHasLarge());
            ps.setBoolean(9, dto.isHasSmall());
            ps.setLong(10, category.getId());
            return ps;
        });
        return dto.getId();
    }

    @Override
    public List<Product> findAll() {
        return template.query(
            "SELECT product_id, product_name, product_price, product_image, product_is_best, product_has_hot, product_has_ice, product_has_large, product_has_small, category_id "
                + "FROM product", productRowMapper());
    }

    @Override
    public Optional<Product> findBy(final Long id) {
        List<Product> products = template.query(
            "SELECT product_id, product_name, product_price, product_image, product_is_best, product_has_hot, product_has_ice, product_has_large, product_has_small, category_id "
                + "FROM product WHERE product_id = ?", productRowMapper(), id);
        return products.stream().findAny();
    }

    @Override
    public int deleteAll() {
        return template.update("DELETE FROM product");
    }

    private RowMapper<Product> productRowMapper() {
        return (rs, rowNum) -> {
            Category category = categoryRepository.findBy(rs.getLong("category_id")).orElseThrow();
            return Product.builder()
                .id(rs.getLong("product_id"))
                .name(rs.getString("product_name"))
                .price(rs.getLong("product_price"))
                .image(rs.getString("product_image"))
                .isBest(rs.getBoolean("product_is_best"))
                .hasHot(rs.getBoolean("product_has_hot"))
                .hasIce(rs.getBoolean("product_has_ice"))
                .hasLarge(rs.getBoolean("product_has_large"))
                .hasSmall(rs.getBoolean("product_has_small"))
                .category(category)
                .build();
        };

    }
}
