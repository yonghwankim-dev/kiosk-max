package com.kiosk.domain.repository;

import static com.kiosk.domain.entity.CategoryType.COFFEE;

import com.kiosk.domain.entity.Category;
import com.kiosk.domain.entity.Product;
import com.kiosk.web.controller.dto.ProductDto;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.AfterEach;
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
            .image("path")
            .isBest(false)
            .hasHot(true)
            .hasIce(true)
            .hasLarge(true)
            .hasSmall(true)
            .category(category)
            .build();
        ProductDto productDto = new ProductDto(product);
        // when
        Long id = productRepository.save(productDto);
        // then
        Product findProduct = productRepository.findBy(id).orElseThrow();
        SoftAssertions.assertSoftly(softAssertions -> {
            softAssertions.assertThat(findProduct.getId()).isEqualTo(id);
        });
    }
}
