package com.example.msoperation.Entities;


import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

public class Transfusion implements Serializable {
    @Temporal(TemporalType.DATE)
    private Date date;
    @Temporal(TemporalType.TIME)
    private Time heure;
    private String type;
    private String Motif;
    private String numPoche;

}
