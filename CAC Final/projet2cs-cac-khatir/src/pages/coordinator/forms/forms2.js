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
        <h1 className="form-heading">Coordinator Form Aprés Operation</h1>
        <br></br>
        <div className="App">
          <div className="subheading-container">
          <h1 className="form-subsubheading">Reveil</h1>
          <div className="form-group-custom">
          <input
            type="text"
            placeholder="salle "
            
            name="salle"
            className="margin-right margin-left"
          />

          <input
            type="text"
            placeholder="duree "
            
            name="duree"
            className="margin-right margin-left"
          />

          <input
            type="text"
            placeholder="temps entree "
            
            name="tempsEntree"
            className="margin-right margin-left"
          />

            <input
            type="text"
            placeholder="temps sortie "
            
            name="tempsSortie"
            className="margin-right margin-left"
          />

            <input
            type="text"
            placeholder="heur fin"
            
            name="heurFin"
            className=" "
          />


          </div>

          
          <div className="form-group-custom">
          

         

          <textarea cols="50" rows="15"
            type="text"
            placeholder="incidents "
            
            name="incidents"
            className="margin-right margin-left"
          />     
          

          </div></div>       </div>       

    
        
      </form>
          </div>
        </div>
      </div>
      </div>
      </div>
  );
}

export default useForms;