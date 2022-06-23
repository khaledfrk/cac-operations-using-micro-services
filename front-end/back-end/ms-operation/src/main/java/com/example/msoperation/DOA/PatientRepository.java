package com.example.msoperation.DOA;

import com.example.msoperation.Entities.Operation;
import com.example.msoperation.Entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findPatientByIdPatient(Long id);

}
