package com.example.msoperation.DOA;

import com.example.msoperation.Entities.Personnel;
import com.example.msoperation.Entities.SalleOperatoire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SalleOperatoireRepository extends JpaRepository<SalleOperatoire, Long> {
}
