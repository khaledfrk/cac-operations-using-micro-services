import React, { useState, memo } from "react"
import "./style.css"
import avatar from '../../../assets/avatar 1.png';
import alert from '../../../assets/alert.png';
import { Autocomplete, Button, TextField } from "@mui/material";

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function useForms() {

  
    const [formFields, setFormFields] = useState([
      { name: 'product1', qtP: '4' },{ name: 'product4', qtP: '40' },{ name: 'product1', qtP: '4' },{ name: 'product4', qtP: '40' },
    ])
  
    const handleFormChange = (event, index) => {
      let data = [...formFields];
      data[index][event.target.name] = event.target.value;
      setFormFields(data);
    }
  
    const submit = (e) => {
      e.preventDefault();
      console.log(formFields)
    }
  
    const addFields = () => {
      let object = {
        name: '',
        age: ''
      }
  
      setFormFields([...formFields, object])
    }
  
    const removeFields = (index) => {
      let data = [...formFields];
      data.splice(index, 1)
      setFormFields(data)
    }
  


    





  return (

    <div className="page-container">
       
      <div>
			<div className="sidebar-container-form">
				<div className="sidebareWrapper">
        <span className="logo"><img src={avatar} width="100px" alt="logo"/></span>
				<div className='info-container'>
        
        <div className='name'>Flen Ben Flen</div>
        </div>
        <hr className="solid"></hr>
        <div className='alert-container'>
        <img src={alert} width="20px"></img><br></br><br></br>
          this patient does not tolerate certain products.
        </div>
        <div className="info-wrapper">
        <div className="patient-info">
            <h1 className="form-subheading-info">Date naissance: </h1> <p className="p-info">02/03/2004</p>
          
         </div>
         <div className="patient-info">
            <h1 className="form-subheading-info">Lieu de naissance: </h1> <p className="p-info">Annaba</p>
            </div>
          <div className="patient-info">
            <h1 className="form-subheading-info">Maladie: </h1> <p className="p-info">02/03/2004</p>
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
                  Operation + id
                </div>
                <div className='btn'>
                   <button className='btn-clck'>Commence operation </button> 
                </div>
            </div>
          </div>
        <div className="form-form">
          <div className='form'>
          <form  className="form-custom familyFix form-start">
        <h1 className="form-heading">Coordinator Form</h1>
        <br></br>
        <div className="App">
          <div className="subheading-container">
        <h1 className="form-subheading">Produits utilisés</h1>
        </div>
        {formFields.map((form, index) => {
          return (
            <div className="multiple form-group-custom" key={index}>

          <input
            className="margin-left margin-right nomProduit"            
            name="product1"
            id={index}
            type="checkbox"
          />   
          <label for={index} className="nomProduit label-selection "> {form.name} : x {form.qtP} </label>
             
            </div>
          )
        })}
    
      
      <br />
      
    </div>
        <br></br>
        <h1 className="form-subheading">Heur d'admission au bloc</h1>
        <div className="form-group-custom">
          
          <div  className="multiple form-group-custom">
          
        
          <input
            type="date"          
             name="heurAdmis"
            className="margin-left"
          />
          </div>
       
    </div>

          <h1 className="form-subheading">Heur d'admission au salle</h1>
          <div className="form-group-custom">
          
          <div  className="multiple form-group-custom">
     
        
          <input
            type="date"          
             name="heurAdmis"
            className="margin-left"
          />
          </div>


    </div>
              
        
      </form>
          </div>
        </div>
      </div>
      </div>
      </div>
  );
}

export default useForms;