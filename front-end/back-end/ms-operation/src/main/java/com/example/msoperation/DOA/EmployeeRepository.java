package com.example.msoperation.DOA;

import com.example.msoperation.Entities.Details;
import com.example.msoperation.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findEmployeeByFirstName(String name);
}
