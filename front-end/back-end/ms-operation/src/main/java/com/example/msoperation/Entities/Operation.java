package com.example.msoperation.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
//import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Operation{
    @Id
    @Column(insertable=false ,updatable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOperation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idS")
    private SalleOperatoire salle;

    @Enumerated(EnumType.STRING)
    private TypeOperation operationType;

    @Column(nullable = false)
    private Timestamp startAt;

    @Column(nullable = false)
    private Timestamp endAt;

    //@Column(nullable = true)
    //@JsonIgnore
    //dirir fetch lazy fi ga3 one to one
    @OneToOne(mappedBy = "operation")
    private Details details;


    //@Column(nullable = true)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idPatient")
    private Patient patient;

    //@Column(nullable = true)
    //@JsonIgnore
    @ManyToMany
    @JoinTable(name="participe",
            inverseJoinColumns=@JoinColumn(name="idPersonnel"),
            joinColumns=@JoinColumn(name="idOperation"))
    private List<Personnel> personnels;

    @Column(columnDefinition="tinyint(1) default 0")
    private Boolean statChirugien;
    @Column(columnDefinition="tinyint(1) default 0")
    private Boolean statAnesthesiste;
    @Column(columnDefinition="tinyint(1) default 0")
    private Boolean statCoordinateur;


    //@ElementCollection(targetClass = Object.Personnel)
    //@CollectionTable(name = "Final_Feign_Client_Result_Columns")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    /*
    @JsonIgnore
    @JsonManagedReference
    @OneToMany(mappedBy = "operation",fetch = FetchType.LAZY)
    private Collection<Chirurgien_resident> Chirurgien_residents;
*/



}
