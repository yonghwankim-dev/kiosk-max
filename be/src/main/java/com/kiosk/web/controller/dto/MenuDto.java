package com.kiosk.web.controller.dto;

import com.kiosk.domain.entity.Category;
import com.kiosk.domain.entity.Product;
import java.util.Objects;
import lombok.Getter;

@Getter
public class MenuDto {

    private Long menuId;            // 상품 아이디
    private final String name;        // 이름
    private final Long price;         // 가격
    private final String imgUrl;       // 이미지 저장 경로
    private final boolean isBest;     // 인기 상품
    private final boolean hasHot;     // 핫 가능 여부
    private final boolean hasIce;     // 아이스 가능 여부
    private final boolean hasLarge;   // 라지 사이즈 가능 여부
    private final boolean hasSmall;   // 스몰 사이즈 가능 여부
    private final Long categoryId;    // 카테고리 아이디

    public MenuDto(final Product product) {
        this.menuId = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.imgUrl = product.getImageUrl();
        this.isBest = product.isBest();
        this.hasHot = product.isHasHot();
        this.hasIce = product.isHasIce();
        this.hasLarge = product.isHasLarge();
        this.hasSmall = product.isHasSmall();
        this.categoryId = product.getCategory().getId();
    }

    public Product toEntity() {
        return Product.builder()
            .id(menuId)
            .name(name)
            .price(price)
            .imageUrl(imgUrl)
            .isBest(isBest)
            .hasHot(hasHot)
            .hasIce(hasIce)
            .hasLarge(hasLarge)
            .hasSmall(hasSmall)
            .category(Category.builder().id(categoryId).build())
            .build();
    }

    public boolean matchCategoryId(final Category category) {
        return Objects.equals(category.getId(), categoryId);
    }

    public void setMenuId(final Long menuId) {
        this.menuId = menuId;
    }
}
