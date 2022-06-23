package com.example.msstock.Repository;

import com.example.msstock.Entities.ProductSortie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductSRepo extends JpaRepository<ProductSortie,Long> {
    public ProductSortie findProductSortieByProductSId(Long id);
}
