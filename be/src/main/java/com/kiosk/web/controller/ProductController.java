package com.kiosk.web.controller;

import com.kiosk.web.controller.dto.ProductDto;
import com.kiosk.web.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(final ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/menus")
    public List<ProductDto> list() {
        return productService.findAll();
    }
}
