import React, { Fragment, useEffect, useState } from "react";
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
import "./styleStock.css"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { deleteProduct, getProducts } from "../../../redux/actions/products";
import { Button } from "@mui/material";
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  








export default function () {
  const navigate = useNavigate();
  const headerProps = {
    // avatarUrl: "nikolaSlika 1.jpg",
    welcomeMsg: "",
    userName: "La Pharmacie",
    userTitle: "",
    buttonPage: "Ajouter Produit"
  };
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEdit = (productId) => {
    console.log(productId);
    navigate(`/admin/EditProduct/${productId}`);
  };

  const columns = [
    { field: 'productId', headerName: 'ID', width: 70 },
    { field: 'nomP', headerName: 'Nom Produit', width: 130, editable: true },
    { field: 'qntP', headerName: 'Type', width: 130 },
    { field: 'typeP', headerName: 'Prix', width: 130 },
    { field: 'prixP', headerName: 'Quantité', width: 70 },
    { field: 'nlot', headerName: 'Num lot', width: 130 },
    { field: 'datePeremption', headerName: 'Date Péremption', width: 130 },
    { field: 'delai', headerName: 'Délai', width: 130 },
    { field: 'categorie', headerName: 'Catégorie', width: 130 },
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
            handleDelete(params.row.productId)
          }} style={{ "color": "red" }}>Delete</Button>
        </div>);
      }
    },
  ]

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
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
        <Sidebar links={getSidebarLinks("admin", 4)} />
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
          buttonPage={headerProps.buttonPage}

        />


        <div style={{ height: 600, width: '100%' }}>

          <DataGrid
            getRowId={row => row.productId}
            experimentalFeatures={{ newEditingApi: true }}
            rows={products}
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

