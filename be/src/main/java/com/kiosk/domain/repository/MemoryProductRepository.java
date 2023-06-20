package com.kiosk.domain.repository;

import com.kiosk.domain.entity.Product;
import com.kiosk.web.controller.dto.ProductDto;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import org.springframework.stereotype.Repository;

@Repository
public class MemoryProductRepository implements ProductRepository {

    private static final Map<Long, Product> store = new ConcurrentHashMap<>();
    private static Long sequence = 0L;

    public Long save(final ProductDto productDto) {
        Long id = nextId();
        productDto.setId(id);
        store.put(id, productDto.toEntity());
        return id;
    }

    public List<Product> findAll() {
        return store.values().stream()
            .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public Product findBy(final Long id) {
        return store.get(id);
    }

    public synchronized static Long nextId() {
        return ++sequence;
    }
}
