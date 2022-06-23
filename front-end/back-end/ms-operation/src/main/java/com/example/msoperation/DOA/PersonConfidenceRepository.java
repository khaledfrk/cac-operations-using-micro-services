package com.example.msoperation.DOA;

import com.example.msoperation.Entities.PersonConfidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PersonConfidenceRepository extends JpaRepository<PersonConfidence, Long> {
}
