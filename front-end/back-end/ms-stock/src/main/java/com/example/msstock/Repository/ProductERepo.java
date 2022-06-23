package com.example.msstock.Repository;

import com.example.msstock.Entities.ProductEntree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductERepo extends JpaRepository<ProductEntree,Long> {
}
