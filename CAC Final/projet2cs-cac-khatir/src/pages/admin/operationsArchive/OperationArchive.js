import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSidebarLinks } from '../../../commons/sidebarLinks';
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Button } from "@mui/material";
import { getEmployeesAll } from '../../../redux/actions/employee';
import { getOperations } from '../../../redux/actions/operations';
import { getProducts } from '../../../redux/actions/products';
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  


export default function OperationArchive() {


    const operations = useSelector((state) => state.operationsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getOperations());
    }, []);

    const handleEdit = (opId) => {
        console.log(opId);
        navigate(`/admin/operations/details/${opId}`);
      };


    const headerProps = {
        // avatarUrl: "nikolaSlika 1.jpg",
        welcomeMsg: "",
        userName: "Archive Operations",
        userTitle: "",
        buttonPage: ""
    };

    const columns = [
        { field: 'idOperation', headerName: 'ID', width: 70 },
        // { field: 'patient', headerName: 'Patient', width: 130 },
        {
            field: 'patient',
            headerName: 'patient',
            renderCell: (params) => {
                const patient = params.row.patient;
                return (
                    <>
                        <p>{`${patient.nom}- ${patient.prenom}`} </p>
                    </>
                );
            },
            valueGetter: (params) => `${params.row.patient.nom}- ${params.row.patient.prenom}`,
        },
        { field: 'startAt', headerName: 'Date', width: 130 },
        { field: 'operationType', headerName: 'Type', width: 130 },
        {
            field: "details",
            headerName: "details",
            
            width: 140,
            renderCell: (params) => {
              return (<div>
                <Button onClick={() => {
                  handleEdit(params.row.idOperation)
                }}>MORE DETAILS</Button>
              </div>);
            }
          },
    ]


    const logoutUser = () => {
        dispatch(logout(navigate));
      };
    return (
        <div>

<div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>
        <div className="page-container">

            <div className="sidebar-link-container">
                <Sidebar links={getSidebarLinks("admin", 5)} />
            </div>

            <div
                className="others-stats"

            >
                <Header
                    avatarUrl={headerProps.avatarUrl}
                    welcomeMsg={headerProps.welcomeMsg}
                    userName={headerProps.userName}
                    userTitle={headerProps.userTitle}
                    buttonPage={headerProps.buttonPage}

                />


                <div style={{ height: 600, width: '100%' }}>

                    <DataGrid experimentalFeatures={{ newEditingApi: true }}
                        getRowId={row => row.idOperation}
                        rows={operations}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        disableSelectionOnClick
                    />


                </div>

            </div>
        </div>
        </div>
    )
}
