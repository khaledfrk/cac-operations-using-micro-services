import "./styles.css";
import { format } from "date-fns";
// import { updateAppointment } from "../../redux/actions/appointments";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";



const SingleAppointment = ({ appointment }) => {
  const dispatch = useDispatch();
  console.log(appointment);
  const { id, startAt, salle, personnels, patient, operationType, idOperation, endAt, details ,statChirugien} = appointment;

  // let age = format(new Date(), "yyyy") - format(2000, "yyyy");
  let appointTime = format(new Date(startAt), "HH:mm");
  let appointDate = format(new Date(startAt), "dd:MM:yyyy");
  const [satus,setStatus]=useState("")


  return (

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
       {(statChirugien===false)? (<Link to={`/doctor/form/${idOperation}`}  className="fill">Remplire le form</Link>):(null)}
       { (statChirugien===false) ? (<div></div>) :  (
                 <Link to={`/doctor/Editform/${idOperation}`} className='modify'> Modifier le form </Link>
                 )}
                 </div>
    </div>
    </div>
</div>
  );
};

export default SingleAppointment;
