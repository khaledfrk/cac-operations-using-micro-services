import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { FaUserInjured } from 'react-icons/fa';
import { GiMedicalDrip, GiMedicalPack } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import ScheduledAppointments from '../../../components/ScheduledAppointments/ScheduledAppointments';
import { logout } from '../../../redux/actions/auth';
import { getOperationsByUserName } from '../../../redux/actions/operations';
import "./style.css"
import turnoff from '../../../assets/turnOff.png'  



export default function ChirurgienHomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
    const appointments = useSelector((state) => state.operationsReducer);

    const [val, setVal] = useState("All");
    const [str, setStr] = useState('');
    const [headerProps,setHeaderProps]=useState(
      
      {
        userName: "Dr.",
        userTitle: "Chirurgien",
      }
    )
    const logoutUser = () => {
      dispatch(logout(navigate));
    };
  


    const [doctor,setDoctor]=useState({});


    
    useEffect(()=>{
      const token = localStorage.getItem("token");
      if (token) {
        setDoctor(JSON.parse(localStorage.getItem("loggedUser")));
      } else navigate("/login");
      const username= JSON.parse(localStorage.getItem("loggedUser")).sub;
      setHeaderProps({
        ...headerProps,
        userName:username,
      });
      dispatch(getOperationsByUserName(username));
    },[])
  
  
    const generalStatsProps = [
      {
        image: <GiMedicalPack size="45px" />,
        text: "appoitments",
        number: "34",
      },
      {
        image: <FaUserInjured size="45px" />,
        text: "nombre patient",
        number: "10",
      },
      {
        image: <GiMedicalDrip size="45px" />,
        text: "Operation",
        number: "10",
      },
    ];
  
    // const filteredElements = appointments.filter(e => {
    //   if (val === "All") {
    //     return e.operationType.includes(str);
    //   } else if (val === "operationType") {
    //     return e.operationType.includes(str);
    //   } 
    //   else if (val === "salle") {
    //     return e.salle.toString().includes(str);
    //   }
    // });
  
    // console.log(filteredElements);
  
  return (
    <>
    <div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>
    <div className="page-container">

   

    
      <Header 
        // avatarUrl={headerProps.avatarUrl}
        // welcomeMsg={headerProps.welcomeMsg}
        userName={headerProps.userName}
        userTitle={headerProps.userTitle}
        day={format(new Date(), "d")}
        date={format(new Date(), "d MMMM, yyyy")}
      />

      <div className="components">



        {/* <input onChange={(e) => {
          setStr(e.target.value)
        }} />
        <select
          className="filter"
          aria-label="select type of medical examination"
          onChange={(e) => setVal(e.target.value)}
        >
          <option value={"All"}>All</option>
          <option value={"operationType"}>type operation</option>
          <option value={"salle"}> salle </option>
        </select> */}

       {/* <div>{val}</div>
       <div>{filteredElements.map(e=><li>{e.operationType}</li>)}</div> */}

        {/* <GeneralStats
          image={generalStatsProps[0].image}
          text={generalStatsProps[0].text}
          number={generalStatsProps[0].number}
        />
        <GeneralStats
          image={generalStatsProps[1].image}
          text={generalStatsProps[1].text}
          number={generalStatsProps[1].number}
        />
        <GeneralStats
          image={generalStatsProps[2].image}
          text={generalStatsProps[2].text}
          number={generalStatsProps[2].number}
        />  */}
      </div>

      


     
    
    </div>
      <div>
        {appointments.length > 0 && (
          <ScheduledAppointments appointments={appointments} person='chirurgien'/>
        )}
  
      </div>
  </>
  )
}
