import { format } from 'date-fns';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getSidebarLinks } from '../../../commons/sidebarLinks';
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { getEmployeesAll } from '../../../redux/actions/employee';
import { getOperations } from '../../../redux/actions/operations';
import { getProducts } from '../../../redux/actions/products';
import { getStats } from '../../../redux/actions/stat';
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  

import "./styles.css"

export default function StatisiquePage() {
    const products = useSelector((state) => state.productReducer);
    const operations = useSelector((state) => state.operationsReducer);
    const employees = useSelector((state) => state.employeeReducer);
    const statistic = useSelector((state) => state.statReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState();


    useEffect(() => {
        dispatch(getProducts());
        dispatch(getEmployeesAll());
        dispatch(getOperations());
        dispatch(getStats())
      },[]);

    const headerProps = {
        // avatarUrl: "nikolaSlika 1.jpg",
        welcomeMsg: "",
        userName: "Les statistiques",
        userTitle: "",
        buttonPage: ""
    };

    console.log(statistic);
    // const data = [
    //     {
    //         name: 'Janvier',
    //         uv: 4000,
    //         pv: 2400,
    //         amt: 2400,
    //     },
    //     {
    //         name: 'fivrier',
    //         uv: 3000,
    //         pv: 1398,
    //         amt: 2210,
    //     },
    //     {
    //         name: 'mars',
    //         uv: 2000,
    //         pv: 9800,
    //         amt: 2290,
    //     },
    //     {
    //         name: 'avril',
    //         uv: 2780,
    //         pv: 3908,
    //         amt: 2000,
    //     },
    //     {
    //         name: 'Mai',
    //         uv: 1890,
    //         pv: 4800,
    //         amt: 2181,
    //     },
    //     {
    //         name: 'juin',
    //         uv: 2390,
    //         pv: 3800,
    //         amt: 2500,
    //     },
    //     {
    //         name: 'juillet',
    //         uv: 2000,
    //         pv: 9800,
    //         amt: 2290,
    //     },
    //     {
    //         name: 'Out',
    //         uv: 2780,
    //         pv: 3908,
    //         amt: 2000,
    //     },
    //     {
    //         name: 'Sep',
    //         uv: 1890,
    //         pv: 4800,
    //         amt: 2181,
    //     },
    //     {
    //         name: 'Ovt',
    //         uv: 2390,
    //         pv: 3800,
    //         amt: 2500,
    //     },
    //     {
    //         name: 'Nov',
    //         uv: 3490,
    //         pv: 4300,
    //         amt: 2100,
    //     },
    //     {
    //         name: 'Dec',
    //         uv: 3450,
    //         pv: 4300,
    //         amt: 2100,
    //     },
    // ];
    var a=0
    operations.map(e=> 
        a=a+1
        );
        var b=0
        employees.map(e=> 
        b=b+1
        );

        var c=0;
    products.map(e=> 
        c=c+1
        );
        const logoutUser = () => {
            dispatch(logout(navigate));
          };
      
    return (
        <>
<div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>


          <div className="page-container"> 
            <div className="sidebar-link-container">
                <Sidebar links={getSidebarLinks("admin", 3)} />
            </div>
            <div
            className="others-stats"
            //  style={{ marginLeft: "15%" }}
            >
                <Header
                    avatarUrl={headerProps.avatarUrl}
                    welcomeMsg={headerProps.welcomeMsg}
                    userName={headerProps.userName}
                    userTitle={headerProps.userTitle}
                    
                    />
                    <div className='stats-contain'>
                    <div className='stats'> operations:   {a}</div>
                    <div className='stats'> employees:    {b}</div>
                    <div className='stats'>products:    {c}</div>
                    </div>

                {/* <div className="chart">
                    <h3 className="chartTitle">Operation analytic</h3>
                    <ResponsiveContainer width="100%" aspect={4 / 1}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={"name"} stroke="#5550bd" />
                            <Tooltip />
                            {/* <Legend /> */}
                            {/* {true && <Line type="monotone" dataKey={"pv"} stroke="#8884d8" activeDot={{ r: 8 }} />} */}
                        {/* </LineChart> */}
                    {/* </ResponsiveContainer> */}
                {/* </div>  */}

                <div className='chart'>
                <h3 className="chartTitle">Nombre d'opérations en relation avec les personels</h3>
                <ResponsiveContainer width="100%"  aspect={4 / 1}  className="graph">
                    <BarChart
                        width={300}
                        // height={300}
                        data={statistic}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey= {"nom"} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={"nbOperation"} stackId="a" fill="#f692b8" />
                        {/* <Bar dataKey={"uv"} stackId="a" fill="#82ca9d" /> */}
                    </BarChart>

                </ResponsiveContainer>
                </div>



            </div>
          </div>

        </>
    )
}
