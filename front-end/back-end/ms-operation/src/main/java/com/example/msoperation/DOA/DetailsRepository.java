package com.example.msoperation.DOA;

import com.example.msoperation.Entities.Details;
import com.example.msoperation.Entities.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DetailsRepository extends JpaRepository<Details, Long> {
}
