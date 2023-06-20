package com.kiosk.web.service;

import com.kiosk.domain.repository.MemoryProductRepository;
import com.kiosk.web.controller.dto.ProductDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ProductService {

    private final MemoryProductRepository productRepository;

    public List<ProductDto> findAll() {
        return productRepository.findAll()
            .stream()
            .map(ProductDto::new)
            .collect(Collectors.toUnmodifiableList());
    }
}
