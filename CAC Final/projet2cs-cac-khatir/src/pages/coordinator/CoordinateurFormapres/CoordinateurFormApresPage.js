import React, { useEffect, useState } from 'react'
import avatar from '../../../assets/avatar 1.png';
import alert from '../../../assets/alert.png';
import "./style.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDetailOperationCoor, createDetailOperationCoordinateur, getOperationById } from '../../../redux/actions/operations';
// {
//   "dateFinBloc": "2024-02-22T11:45:01",
//   "reveil": {
//       "nomReveil": "rrrrrr",
//       "dateDebutReveil": "2022-02-22T12:55:01",
//       "dateFinReveil": "2022-02-22T15:55:01"
//   },
//   "accidents": "accident4",
//   "incidents": "incident4"
// }

// {
//   "dateDebutBloc": "2024-02-22T10:45:01"
// }
const initialState = {
  dateFinBloc: "",
    reveil: {
        nomReveil: "rrrrrr",
        dateDebutReveil: "",
        dateFinReveil: ""
    },
    accidents: "",
    incidents: ""
  };




export default function CoordinateurFormApresPage() {


  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const location=useLocation();
  const [path,setPath]=useState();
  const operation = useSelector((state) => state.operationsReducer);
  

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    setPath(pathParts[pathParts.length - 1]);
    dispatch(getOperationById(pathParts[pathParts.length - 1]));
}, []);

  
  const handleChange = (e) =>{

    setForm(
      {  
         ...form,[e.target.name]: e.target.value     
       }
      );
      console.log(form);
  }
  const handleChangedate = (e) =>{

    setForm(
      {  
         ...form,
         dateFinBloc: e.target.value     
       }
      );
      console.log(form);
  }

  const handleChangereveil = (e) =>{

    setForm(
      {  
        accidents:form.accidents,
        incidents:form.incidents,
        dateFinBloc:form.dateFinBloc,
        reveil:{...form.reveil,
             [e.target.name]: e.target.value},
       }
      );

      console.log(form);
  }
  const handleChangereveildebut = (e) =>{

    setForm(
      {  
        accidents:form.accidents,
        incidents:form.incidents,
        dateFinBloc:form.dateFinBloc,
        reveil:{...form.reveil,
          dateDebutReveil: e.target.value},
       }
      );

      console.log(form);
  }
  const handleChangereveilfin = (e) =>{

    setForm(
      {  
        accidents:form.accidents,
        incidents:form.incidents,
        dateFinBloc:form.dateFinBloc,
        reveil:{...form.reveil,
          dateFinReveil: e.target.value},
       }
      );

      console.log(form);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDetailOperationCoordinateur({...form},path));
    navigate("/coordinateur")
  };



  



  return (
    (operation.length !== 0) ?
    <div className="page-container">
       
    <div>
          <div className="sidebar-container-form">
              <div className="sidebareWrapper">
      <span className="logo"><img src={avatar} width="100px" alt="logo"/></span>
              <div className='info-container'>
              <div className='name'>{operation.patient.nom} | {operation.patient.prenom}</div>
                            
      </div>
      <hr className="solid"></hr>
      <div className='alert-container'>
      <img src={alert} width="20px"></img><br></br><br></br>
      Ce patient ne support pas certains types de produits.
      </div>
      <div className="info-wrapper">
      <div className="patient-info">
      <h1 className="form-subheading-info">Date de naissance: </h1> <p className="p-info">{operation.patient.dateNaissance}</p>
        
       </div>
       <div className="patient-info">
       <h1 className="form-subheading-info">Lieu de naissance: </h1> <p className="p-info">{operation.patient.lieuNaissance}</p>
          </div>
        <div className="patient-info">
        <h1 className="form-subheading-info">Pathologie: </h1> <p className="p-info">{operation.operationType}</p>
          </div>
          </div>
              </div>
          </div> 

      </div>
     
    <div className='others'>
      <div className='forms-container'>
        <div className='forms-header'>
          <div className='title-container'>
              <div className='title'>
                Operation {path}
              </div>
          </div>
        </div>
      <div className="form-form">
        <div className='form'>
        <form onSubmit={handleSubmit} className="form-custom familyFix form-start">
      <h1 className="form-heading">Formulaire de coordinateur post opératoire</h1>
      <br></br>
      <div className="App">
        <div className="subheading-container">
        <h1 className="form-subsubheading">Date de sortie du bloc</h1>
        {/* <div className='form-group-custom'> */}

            <input
              onChange={handleChangedate}
              type="datetime-local"
              placeholder="Date de sortie du bloc"
              name="dateFinBloc"
            />
        {/* </div> */}

        </div>
        <div className="subheading-container">
        <h1 className="form-subsubheading">Réveil</h1>
        <div className="form-group-custom">
            <br/>
            <br/>
        <h1 className="form-subsubheading">Salle</h1>
        <input
          type="text"
          placeholder="nomReveil "
          onChange={handleChangereveil}
          name="nomReveil"
          className="margin-right margin-left"
        />
        <h1 className="form-subsubheading">Date d'entrée</h1>
        <input
          type="datetime-local"
          placeholder="dateDebutReveil "
          onChange={handleChangereveildebut}
          name="dateDebutReveil"
          className="margin-right margin-left"
        />
        <h1 className="form-subsubheading">Date de sortie</h1>
        <input
          type="datetime-local"
          placeholder="dateFinReveil"
          onChange={handleChangereveilfin}
          name="dateFinReveil"
          className="margin-right margin-left"
        />

      


        </div>

        
        <div className="form-group-custom">
        

       

        <textarea cols="50" rows="15"
          type="text"
          placeholder="Incidents"
          onChange={handleChange}
          name="incidents"
          className="margin-right margin-left"
        />   

        <textarea cols="50" rows="15"
          type="text"
          placeholder="Accidents"
          onChange={handleChange}
          name="accidents"
          className="margin-right margin-left"
        />     
        

        </div></div>       </div>       

  
              <div className='btn'>
                 <button onClick={handleSubmit} className='btn-clck'>Terminer</button> 
              </div>
      
    </form>
        </div>
      </div>
    </div>
    </div>
    </div>:<div>please wait</div>
  )
}
