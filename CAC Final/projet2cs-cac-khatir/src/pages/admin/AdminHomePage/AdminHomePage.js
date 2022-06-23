import React, { useEffect, useState } from 'react'
import CustomCalendar from '../../../components/CustomCalendar/CustomCalendar'
import NewAppointment from '../../../components/NewAppointment/NewAppointment'
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOperation, getOperations } from '../../../redux/actions/operations';
import './Admin.css'
import { getPatients } from '../../../redux/actions/patients';
import { getChirugiens } from '../../../redux/actions/chirugien';
import { getAnesthesistes } from '../../../redux/actions/anesthesistes';
import { getCoordinateurs } from '../../../redux/actions/coordinateur';
import { getSalles } from '../../../redux/actions/salle';
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'
export default function AdminHomePage() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [newAppointmentVisible, setNewAppointmentVisible] = useState(false);
  const [deleteAppointmentVisible, setDeleteAppointmentVisible] = useState(false);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  // const [selectedA]
  const operations = useSelector((state) => state.operationsReducer);
  const patients = useSelector((state) => state.patientReducer);
  const chirurgiens = useSelector((state) => state.chirugienReducer);
  const anesthesistes = useSelector((state) => state.anesthesistesReducer);
  const coordinateurs = useSelector((state) => state.coordinateursReducer);
  const salles = useSelector((state) => state.sallesReducer);
  const [appointmentIdDelete, setAppointmentIdDelete] = useState(1);
  const [events, setEvents] = useState([
    {
      id: 1,
      startAt: "2022-04-08T08:00:00.000Z",
      endAt: "2022-04-08T09:00:00.000Z",
      summary: "operation",
      color: "#336cfb",
      calendarID: "work",
    },
  ]);

  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAdmin(JSON.parse(localStorage.getItem("loggedUser")));
    } else navigate("/login");


    dispatch(getPatients());
    dispatch(getChirugiens());
    dispatch(getAnesthesistes());
    dispatch(getCoordinateurs());
    dispatch(getSalles());
    dispatch(getOperations());
  }, []);


  useEffect(() => {
    if (operations.length > 0) {
      setEvents(
        operations.map((operation) => {
          return {
            id: operation.idOperation,
            startAt: operation.startAt,
            endAt: operation.endAt,
            summary: "operation" + operation.idOperation,
            color: "#62AEC5",
            calendarID: "work",
          };
        })
      );
    }
  }, [operations]);

  // eslint-disable-next-line no-extend-native
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };



  const createNewAppointment = (patient, date, salle, operationType, chirurgiens, Anistisistes, cordinateur) => {
    const newEvent = {
      id: events.length + 1,
      startAt: date.toISOString(),
      endAt: date.addHours(1).toISOString(),
      summary: "operation" + events.length,
    };
    setNewAppointmentVisible(false);
    setEvents([...events, newEvent]);
    dispatch(
      createOperation({
        startAt: date.toISOString(),
        endAt: date.addHours(1).toISOString(),
        patient: patient,
        salle: salle,
        operationType: operationType,
        personnels: [...chirurgiens, ...Anistisistes, cordinateur],
      })
    );
  };
  // Anistisistes:Anistisistes,
  // cordinateur:cordinateur,
  // summary:"operation"+ events.length,
  // color: "#336cfb",
  // calendarID: "work",

  const deleteAppointment = () => {
    setDeleteAppointmentVisible(false);
  };



  const logoutUser = () => {
    dispatch(logout(navigate));
  };




  return (

    
    <div>
      <div className='username-container'>
        <div className='username'>{admin.sub} |</div>
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>
      <div className="page-container">

        <Sidebar links={getSidebarLinks("admin", 1)} styel=" position: fixed; z-index: 1;"/>

        <div className='others'>
          <div className="calendar" style={{ height: "100%", width: "75vw" }}>
            <CustomCalendar
              events={events}
              setDate={setDate}
              setNewAppointmentVisible={setNewAppointmentVisible}
              setDeleteAppointmentVisible={setDeleteAppointmentVisible}
              setAppointmentIdDelete={setAppointmentIdDelete}
            />
          </div>
          {newAppointmentVisible &&
            <NewAppointment
              // avatarUrl={"nikolaSlika 1.jpg"}
              userName={`Dr.`}
              userTitle={"Kardiolog"}
              chirurgiens={chirurgiens}
              createNewAppointment={createNewAppointment}
              setNewAppointmentVisible={setNewAppointmentVisible}
              date={date}
              patients={patients}
              anesthesistes={anesthesistes}
              coordinateurs={coordinateurs}
              salles={salles}
            />
          }

        </div>
      </div>
    </div>

  )
}
