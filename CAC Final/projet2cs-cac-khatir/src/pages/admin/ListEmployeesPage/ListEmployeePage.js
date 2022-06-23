
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import GeneralStats from "../../../components/GeneralStats/GeneralStats";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
// import { getAppointments } from "../../../redux/actions/appointments";
// import { getPatients } from "../../../redux/actions/patients";
import ScheduledAppointments from "../../../components/ScheduledAppointments/ScheduledAppointments";
import { FaUserInjured } from "react-icons/fa";
import { GiMedicalDrip, GiMedicalPack } from "react-icons/gi";
// import { resetUser } from "../../../redux/actions/auth";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import "./styleEmployees.css"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { getEmployees, getEmployeesAll } from "../../../redux/actions/employee";
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  


export default function ListEmployeePage() {
    const headerProps = {
        // avatarUrl: "nikolaSlika 1.jpg",
        welcomeMsg: "",
        userName: "Les Employés",
        userTitle: "",
        buttonPage: "Ajouter Employé"
    };
    const handleClick = (productId) => {
        // dispatch(deleteProduct(productId));
      };
    
      const handleEdit = (productId) => {
        console.log(productId);
        // navigate(`/admin/EditProduct/${productId}`);
      };

    const columns = [
        { field: 'idPersonnel', headerName: 'ID', width: 70, editable: true },
        { field: 'nom', headerName: 'Nom', width: 130, editable: true },
        { field: 'prenom', headerName: 'Prénom', width: 130 },
        { field: 'role', headerName: 'Role', width: 180 },
        // { field: 'operations', headerName: 'Operations', width: 130 },
        {
            field: "click",
            headerName: "",
            
            width: 140,
            renderCell: (params) => {
              return (<div>
                <Button onClick={() => {
                  handleEdit(params.row.productId)
                }}>Edit</Button>
                <Button onClick={() => {
                  handleClick(params.row.productId)
                }} style={{ "color": "red" }}>Delete</Button>
              </div>);
            }
          },
    ]
    const navigate = useNavigate();



    // const rows = [
    //     { id: 1, firstname: 'khaled', lastname: 'Farek', type: 'Coordinator', operations: '3', },
    //     { id: 2, firstname: 'abde9a', lastname: 'Khatir', type: 'doctor', operations: '5' },
    //     { id: 3, firstname: 'serine', lastname: 'Khatir', type: 'Coordinator', operations: '6' },
    //     { id: 4, firstname: 'sarah', lastname: 'Khatir', type: 'fermliya', operations: '15' },
    //     { id: 5, firstname: 'kaouther', lastname: 'Khatir', type: 'Coordinator', operations: '30' },
    //     { id: 6, firstname: 'islem', lastname: 'Khatir', type: 'Coordinator', operations: '33' },
    //     { id: 7, firstname: 'kika', lastname: 'Khatir', type: 'Coordinator', operations: '3' },
    // ]

    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employeeReducer);
  
    useEffect(() => {
      dispatch(getEmployeesAll());
    }, []);

    const logoutUser = () => {
      dispatch(logout(navigate));
    };

    console.log(employees);
    return (
      <div>      <div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>

        <div>
            <div className="page-container">

                <div className="sidebar-link-container">
                    <Sidebar links={getSidebarLinks("admin", 2)} />
                </div>

                <div
                    className="others-stats"
                // style={{ marginLeft: "15%" }}
                >
                    <Header
                        avatarUrl={headerProps.avatarUrl}
                        welcomeMsg={headerProps.welcomeMsg}
                        userName={headerProps.userName}
                        userTitle={headerProps.userTitle}
                        buttonPageEmploye={headerProps.buttonPage}

                    />


                    <div style={{ height: 600, width: '100%' }}>

                        <DataGrid experimentalFeatures={{ newEditingApi: true }}
                            getRowId={row => row.idPersonnel}
                            rows={employees}
                            columns={columns}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            // checkboxSelection
                            disableSelectionOnClick
                        />         </div>

                </div>
            </div>

        </div>
        </div>

    )
}
