import React from "react";
import SingnalAppoitmentAnesth from "../SingalAppoitmentAnesth/SingnalAppoitmentAnesth";
import SingleAppoitmentCoord from "../SingalAppoitmentCoord/SingleAppoitmentCoord";
import SingleAppoitmentCoord2 from "../SingalAppoitmentCoord/SingleAppoitmentCoord2";
import SingleAppointment from "../SingleAppointment/SingleAppointment";
import "./styles.css";

const ScheduledAppointments = ({ appointments ,person}) => {
  return (
    <div>
      <div className="title" style={{ color: "grey", fontWeight:"bolder"}}>Les opérations d'aujourd'hui <br></br> <br></br>  <hr></hr></div>

      {appointments.map((appointment) => {
        const date = new Date(appointment.startAt).toISOString().substring(0, 10);
        console.log(date);
        const currentdate = new Date().toISOString().substring(0, 10);

        if (date !== currentdate) {

        } else {
          if(person==='chirurgien'){

            return (
  
              <SingleAppointment appointment={appointment} />
            );
          }

           if(person ==="anesthesiste"){
               return <SingnalAppoitmentAnesth appointment={appointment}  />}
          // }
         if(person ==="cordinateur1"){
            return <SingleAppoitmentCoord appointment={appointment} />;
          }

          if(person==="cordinateur2"){
            return <SingleAppoitmentCoord2 appointment={appointment}/>;
          }
          // else{
          //   // return <SingleAppoitmentCoord2 appointment={appointment}/>;
          // }
        // }



        }

      }
      )}
    </div>
  );
};

export default ScheduledAppointments;
