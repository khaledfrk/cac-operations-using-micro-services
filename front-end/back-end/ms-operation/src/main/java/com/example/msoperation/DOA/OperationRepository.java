package com.example.msoperation.DOA;

import com.example.msoperation.Entities.Operation;
import com.example.msoperation.Entities.Patient;
import com.example.msoperation.Entities.Personnel;
import com.example.msoperation.Entities.SalleOperatoire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;
import java.util.List;
@RepositoryRestResource
public interface OperationRepository extends JpaRepository<Operation, Long> {
    //adresse,personel(nom), between age, date

    Operation findOperationByIdOperation(long id);

    List<Operation> findByPersonnelsContains(Personnel p);

    @Query(value="Select count(o.id_operation) from operation o", nativeQuery = true)
    Long countOperation();

    //find op by personnel(nom, prenom)********************************************************
    @Query(value = "Select o.id_operation from operation o join participe c join personnel p  on" +
            " o.id_operation=c.id_operation and p.id_personnel=c.id_personnel" +
            " where (p.nom=:nom and p.prenom=:prenom)", nativeQuery = true)
    List<String> OperationByPersonnel(@Param("nom") String nom, @Param("prenom") String prenom);


//find op by chirurgien(nom, prenom)********************************************************
    @Query(value = "Select o.id_operation from operation o join participe c join personnel p  on" +
            " o.id_operation=c.id_operation and p.id_personnel=c.id_personnel" +
            " where (p.nom=:nom and p.prenom=:prenom and p.role='chirurgien')", nativeQuery = true)
    List<String> OperationByChirurgien(@Param("nom") String nom, @Param("prenom") String prenom);


    //find op by date_debut less than
    @Query(value = "Select o.id_operation from operation o join details d on o.id_operation=d.operation_id_operation" +
            " where d.date_debut<=:dateDebut ", nativeQuery = true)
    List<String> OperationByDateDebutLessThan(@Param("dateDebut") Date dateDebut);



//find op by date_debut greater than
    @Query(value = "Select o.id_operation from operation o join details d on o.id_operation=d.operation_id_operation" +
            " where d.date_debut>=:dateDebut ", nativeQuery = true)
    List<String> OperationByDateDebutGreaterThan(@Param("dateDebut") Date dateDebut);

//find op by date_debut
    @Query(value = "Select o.* from operation o join details d on o.id_operation=d.operation_id_operation" +
            " where d.date_debut=:dateDebut ", nativeQuery = true)
    List<Operation> OperationByDateDebut(@Param("dateDebut") Date dateDebut);

//find op by Salle Operatoire
    @Query(value = "Select o.* from operation o where o.nom=:nom ", nativeQuery = true)
    List<Operation> OperationBySalleOperatoire(@Param("nom") String nom);

//find op by patient(nom, prenom)********************************************************
    @Query(value = "Select o.* from operation o join patient p on o.id_patient=p.id_patient" +
            " where (p.nom=:nom and p.prenom=:prenom)", nativeQuery = true)
    List<Operation> OperationByPatient(@Param("nom") String nom, @Param("prenom") String prenom);


//find op by age************************************************************************
    @Query(value = "Select o.* from operation o join patient p on o.id_patient=p.id_patient" +
            " where p.age=:age ", nativeQuery = true)
    List<Operation> OperationByAge(@Param("age") Integer age);

//find op by age greater than************************************************************************
    @Query(value = "Select o.* from operation o join patient p on o.id_patient=p.id_patient" +
            " where p.age>=:age ", nativeQuery = true)
    List<Operation> OperationByAgeGreaterThan(@Param("age") Integer age);

//find op by age less than************************************************************************
    @Query(value = "Select o.* from operation o join patient p on o.id_patient=p.id_patient" +
            " where p.age<=:age ", nativeQuery = true)
    List<Operation> OperationByAgeLessThan(@Param("age") Integer age);


//find op by sexe************************************************************************
    @Query(value = "Select o.* from operation o join patient p on o.id_patient=p.id_patient" +
            " where p.sexe=:sexe ", nativeQuery = true)
    List<Operation> OperationBySexe(@Param("sexe") String sexe);

//find op by adresse_patient************************************************************
    @Query(value = "Select o.* from operation o join patient p on o.id_patient=p.id_patient" +
            " where p.wilaya=:adr ", nativeQuery = true)
    List<Operation> OperationByAdressePatient(@Param("adr") String adr);

//find op by pathologie******************************************************************
    @Query(value = "Select o.* from operation o join details d on d.id_details=o.details_id_details" +
            " where d.type_operation=:type_operation ", nativeQuery = true)
    List<Operation> OperationByType(@Param("type_operation") String type_operation);
/*
    @Query(value = "Select e.* from client_table e  join compte c on e.id_client=c.idclient " +
            "where c.login=:login", nativeQuery = true)
    List<Client> ClientByLogin(@Param("login") String login);
*/
/*
    @Query(value = "Select e.idemploye, p.nom from Employe e , Projet p  , Departement d " +
            "where e.idDepart=d.idDepart and e.idProjet=p.idProjet" +
            " and d.nom=:nom", nativeQuery = true)

    List<String> EmployeAndProjetByDepartement(@Param("nom") String nom);

    public Operation findOperationBySalle(Salle s);

    //o.iddetails?
    @Query(value = "Select o.* from Operation o  join Details d on o.idDetails=d.idDetails "
            +  "where d.typeOperation=:typeOperation", nativeQuery = true)
    List<Operation> OperationBytypeOperation(@Param("typeOperation") String login);

    @Query(value = "Select o.* from Operation o  join Details d on o.idDetails=d.idDetails "
            +  "where d.dateDebut=:dateDebut", nativeQuery = true)
    List<Operation> OperationBydateDebut(@Param("dateDebut") String login);

 */
}
