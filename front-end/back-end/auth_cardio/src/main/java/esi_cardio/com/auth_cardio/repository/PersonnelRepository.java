package esi_cardio.com.auth_cardio.repository;

import esi_cardio.com.auth_cardio.entity.Personnel;
import esi_cardio.com.auth_cardio.entity.Personnel;
import esi_cardio.com.auth_cardio.entity.UserDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface PersonnelRepository extends JpaRepository<Personnel, Long> {

//find chirurgiens ********************************************************
    @Query(value="Select p.* from personnel p where (p.profession='Chirurgien')",
            nativeQuery = true)
    List<Personnel> getChirurgiens();

//find anesthesisites ********************************************************
    @Query(value="Select p.* from  personnel p where (p.profession='Anesthesiste' )",
            nativeQuery = true)
    List<Personnel> getAnesthesisites();

//find Coordinateur ********************************************************
    @Query(value="Select p.* from  personnel p where (p.profession='Coordinateur' )",
            nativeQuery = true)
    List<Personnel> getCoordinateurs();

//find infermiers ********************************************************
    @Query(value="Select p.* from  personnel p where (p.profession='infermier' )",
            nativeQuery = true)
    List<Personnel> getInfermiers();

//find instrumentiste ********************************************************
    @Query(value="Select p.* from  personnel p where (p.profession='instrumentiste' )",
            nativeQuery = true)
    List<Personnel> getInstrumentistes();

//find residant ********************************************************
    @Query(value="Select p.* from  personnel p where (p.profession='residant' )",
            nativeQuery = true)
    List<Personnel> getResidants();


    Personnel findPersonnelByUsername(String username);

}



