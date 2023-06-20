package com.kiosk.web.controller.dto;

import com.kiosk.domain.entity.Category;
import com.kiosk.domain.entity.CategoryType;
import com.kiosk.domain.entity.Product;
import lombok.Getter;

@Getter
public class ProductDto {

    private Long id;            // 상품 아이디
    private String name;        // 이름
    private Long price;         // 가격
    private String image;       // 이미지 저장 경로
    private boolean isBest;     // 인기 상품
    private boolean hasHot;     // 핫 가능 여부
    private boolean hasIce;     // 아이스 가능 여부
    private boolean hasLarge;   // 라지 사이즈 가능 여부
    private boolean hasSmall;   // 스몰 사이즈 가능 여부
    private Category category;  // 종류

    public ProductDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.image = product.getImage();
        this.isBest = product.isBest();
        this.hasHot = product.isHasHot();
        this.hasIce = product.isHasIce();
        this.hasLarge = product.isHasLarge();
        this.hasSmall = product.isHasSmall();
        this.category = product.getCategory();
    }

    public Product toEntity() {
        return Product.builder()
            .id(id)
            .name(name)
            .price(price)
            .image(image)
            .isBest(isBest)
            .hasHot(hasHot)
            .hasIce(hasIce)
            .hasLarge(hasLarge)
            .hasSmall(hasSmall)
            .category(category)
            .build();
    }

    public void setId(final Long id) {
        this.id = id;
    }
}
