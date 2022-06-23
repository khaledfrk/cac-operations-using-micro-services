package esi_cardio.com.auth_cardio.entity;

import javax.persistence.*;

@Entity
public class Operation {
    @Id
    @Column(insertable=false ,updatable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOperation;

}
