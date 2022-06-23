package esi_cardio.com.auth_cardio.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
public class Personnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPersonnel;

    private String nom;
    private String prenom;


    private int numTel;

    @Embedded
    private Adresse adresse;

    @Column(unique = true)
    private String username;
    @Column
    private String password;
    @Column
    private String role;


    @Temporal(TemporalType.DATE)
    private Date dateNaissance;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sexe sexe;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SituationFamiliale situation; //situation familiale

    @Column
    private UserDAO.State state ;
    public enum State {
        ACTIVE, INACTIVE
    }

    private int nss;
    private int numIdentite;
    private int age;
    /*
        @ManyToOne
        @JsonBackReference
        @JoinColumn(name = "idOperation")
        private Operation operation;
    */
}
