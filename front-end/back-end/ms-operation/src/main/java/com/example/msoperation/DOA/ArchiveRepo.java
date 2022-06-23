package com.example.msoperation.DOA;

import com.example.msoperation.Entities.ArchiveProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ArchiveRepo extends JpaRepository<ArchiveProduct, Long> {
}
