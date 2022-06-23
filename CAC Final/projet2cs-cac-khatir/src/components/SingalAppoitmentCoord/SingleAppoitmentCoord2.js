import { format } from 'date-fns';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SingleAppoitmentCoord2({appointment}) {
    const dispatch = useDispatch();
    console.log(appointment);
    const { id, startAt, salle, personnels, patient, operationType, idOperation, endAt, details, statCoordinateur, statAnesthesiste, statChirugien } = appointment;
    
    // let age = format(new Date(), "yyyy") - format(2000, "yyyy");
    let appointTime = format(new Date(startAt), "HH:mm");
    let appointDate = format(new Date(startAt), "dd:MM:yyyy");
    const [satus, setStatus] = useState("")
  return (
    (statCoordinateur === true)? 
       (
       
       
        <div key={id} >
        <div className="d-flex operations-scheduled">
          <div className="Operations-contain">
            <div>
            <div className='operation-title'>
          <div >Opération | {idOperation}</div>
    
          </div>
          <div className="appTime">
    
            {appointTime} {appointDate}     
          </div>
          <div className="customContainer">
            <div className="flex-row">
              <span className="text-dark text1">
                {patient.nom}  | {patient.prenom}
                    
              </span>
              <span className="text2">
                {patient.age}
              </span>
            </div>
    
          </div>
          <div className="details" >
            <div className="text3"> pathologie : {operationType} </div>
            <p> </p>
            <br></br>
          </div>
          </div>
          <div className='buttons-contain'>
           {(details.reveil === null)? (<Link to={`/coordinateur/operationap/${idOperation}`}  className="fill">Remplire le form</Link>):(null)}
         
                     </div>
        </div>
        </div>
    </div>
       
       
       
       
       
       
       
       
       
       
       
       
       
   )
         : (null)
    
  )
}
