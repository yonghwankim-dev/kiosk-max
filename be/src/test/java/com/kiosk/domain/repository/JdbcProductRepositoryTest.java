package com.kiosk.domain.repository;

import static com.kiosk.domain.entity.CategoryType.*;
import static com.kiosk.domain.entity.CategoryType.COFFEE;

import com.kiosk.domain.entity.Category;
import com.kiosk.domain.entity.CategoryType;
import com.kiosk.domain.entity.Product;
import com.kiosk.web.controller.dto.MenuDto;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JdbcProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    public void setup() {
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        categoryRepository.save(Category.builder().id(1L).categoryType(COFFEE).build());
        categoryRepository.save(Category.builder().id(2L).categoryType(JUICE).build());
        categoryRepository.save(Category.builder().id(3L).categoryType(TEA).build());
        categoryRepository.save(Category.builder().id(4L).categoryType(LATTE).build());
        categoryRepository.save(Category.builder().id(5L).categoryType(SPARKLING).build());
    }

    @Test
    @DisplayName("상품 정보가 주어지고 저장 요청을 했을때 저장소에 저장된다")
    public void save() {
        // given
        Category category = Category.builder()
            .categoryType(COFFEE)
            .build();
        Product product = Product.builder()
            .id(1L)
            .name("아메리카노")
            .price(4000L)
            .imageUrl("path")
            .isBest(false)
            .hasHot(true)
            .hasIce(true)
            .hasLarge(true)
            .hasSmall(true)
            .category(category)
            .build();
        MenuDto menuDto = new MenuDto(product);
        // when
        Long id = productRepository.save(menuDto);
        // then
        Product findProduct = productRepository.findBy(id).orElseThrow();
        SoftAssertions.assertSoftly(softAssertions -> {
            softAssertions.assertThat(findProduct.getId()).isEqualTo(id);
        });
    }
}
