import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { FaUserInjured } from 'react-icons/fa';
import { GiMedicalDrip, GiMedicalPack } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header'
import ScheduledAppointments from '../../../components/ScheduledAppointments/ScheduledAppointments'
import { logout } from '../../../redux/actions/auth';
import { getOperationsByUserName } from '../../../redux/actions/operations';
import turnoff from '../../../assets/turnOff.png'  







function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function CoordianteurHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appointments = useSelector((state) => state.operationsReducer);

  const [val, setVal] = useState("All");
  const [str, setStr] = useState('');
  const [headerProps,setHeaderProps]=useState(
    {
      userName: "Dr.",
      userTitle: "Kardiolog",
    }
  )


  const [doctor,setDoctor]=useState({});

  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token) {
      setDoctor(JSON.parse(localStorage.getItem("loggedUser")));
    } 
    else navigate("/login");
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
  const logoutUser = () => {
    dispatch(logout(navigate));
  };

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

  const [admin, setAdmin] = useState({});

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // console.log(filteredElements);
  return (
    <>
           <div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>
      <div className="page-container">




        <Header
          avatarUrl={headerProps.avatarUrl}
          welcomeMsg={headerProps.welcomeMsg}
          userName={headerProps.userName}
          userTitle={headerProps.userTitle}
          day={format(new Date(), "d")}
          date={format(new Date(), "d MMMM, yyyy")}
        />

        <div className="components">

 

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
      <div className='others' style={{ "marginLeft": "50px" }}>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Navigation"
          indicatorColor="primary"
          textColor="primary"
     
        >
          <Tab label="List Avant Operation" index={0} component={Link} to={"/coordinateur"} />
          <Tab label="List Apres Operation" index={1} component={Link} to={"/coordinateur"} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {appointments.length > 0 && (
            <ScheduledAppointments appointments={appointments} person="cordinateur1" />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
           {appointments.length > 0 && (
            <ScheduledAppointments appointments={appointments} person="cordinateur2" />
          )}
        </TabPanel>
      </div>
    </>
  )
}
