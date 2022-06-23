package com.example.msoperation.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProtocoleOperatoire implements Serializable {
    private Double taille;
    private String aspect;
    private String localisation;
    private String zoneEntournant;
    private String ganglionsLymphatiques  ;

    private String position;
    private String exerese;
    private String typeOncoplastie ;
    @Embedded
    private CurageGanglionnaire curageGanglionnaire;
    @Embedded
    private DrainageExterne drainageExterne;
    private String lesionsLaissees;
    @Embedded
    private PiecesPrelevees piecesPrelevees;
}
