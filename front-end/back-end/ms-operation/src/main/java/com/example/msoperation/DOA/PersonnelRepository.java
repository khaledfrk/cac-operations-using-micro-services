package com.example.msoperation.DOA;

import com.example.msoperation.Entities.Operation;
import com.example.msoperation.Entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface PersonnelRepository extends JpaRepository<Personnel, Long> {

    Personnel findPersonnelByUsername(String username);

    @Query(value="Select count(p.id_personnel) from personnel p", nativeQuery = true)
    Long countPersonnel();

    @Query(value="Select p.nom ,count(c.id_operation) from participe c join personnel p " +
            "on p.id_personnel=c.id_personnel Group BY c.id_personnel",
            nativeQuery = true)
    List<String> getSomething();

//find chirurgiens ********************************************************
    @Query(value="Select p.* from personnel p where (p.role='ROLE_CHIRURGIEN')",
            nativeQuery = true)
    List<Personnel> getChirurgiens();



//find anesthesisites ********************************************************
    @Query(value="Select p.* from  personnel p where (p.role='ROLE_ANESTHESISTE' )",
            nativeQuery = true)
    List<Personnel> getAnesthesisites();

//find Coordinateur ********************************************************
    @Query(value="Select p.* from  personnel p where (p.role='ROLE_COORDINATEUR' )",
            nativeQuery = true)
    List<Personnel> getCoordinateurs();

//find infermiers ********************************************************
    @Query(value="Select p.* from  personnel p where (p.role='ROLE_INFERMIER' )",
            nativeQuery = true)
    List<Personnel> getInfermiers();

//find instrumentiste ********************************************************
    @Query(value="Select p.* from  personnel p where (p.role='ROLE_INSTRUMENTISTE' )",
            nativeQuery = true)
    List<Personnel> getInstrumentistes();

//find residant ********************************************************
    @Query(value="Select p.* from  personnel p where (p.role='ROLE_RESIDANT' )",
            nativeQuery = true)
    List<Personnel> getResidants();
}



