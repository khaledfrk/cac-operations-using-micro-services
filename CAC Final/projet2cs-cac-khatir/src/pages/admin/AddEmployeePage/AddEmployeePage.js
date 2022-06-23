import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSidebarLinks } from '../../../commons/sidebarLinks';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { createEmployee } from '../../../redux/actions/employee';
import "./style.css"
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  


const initialState = {
    nom: "",
    prenom: "",
    dateNaisseance: "",
    // wilaya: "",
    // daira: "",
    // mairie: "",
    numTel: "",
    situation: "",
    numIdentite: "",
    nss: "",
    username: "",
    password:"",
    role: "",
    sexe:"Homme",
    state:"ACTIVE",
  };


export default function AddEmployeePage() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();
  
  
  
    

    const privilegesDemo = [
      {
        id: 0,
        name: "ROLE_CHIRURGIEN",
      },
      {
        id: 1,
        name: "ROLE_INFERMIER",
      },
      {
        id: 2,
        name: "ROLE_RESIDENT",
      },
      {
        id: 3,
        name: "ROLE_INSTRUMETISTE",
      },
      {
        id: 4,
        name: "ROLE_ANESTHESISTE",
      },
      {
        id: 5,
        name: "ROLE_COORDINATEUR",
      },
    ];
  
    const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });
  
    const onChangeDateHandler = (e) => {
      const date = new Date(e.target.value);
      const years = date.toLocaleDateString("en-US", { year: "numeric" });
      const month = date.toLocaleDateString("en-US", { month: "numeric" });
      const day = date.toLocaleDateString("en-US", { day: "numeric" });
      let formatted = years;
      formatted += month.length === 1 ? `-0${month}` : `-${month}`;
      formatted += day.length === 1 ? `-0${day}` : `-${day}`;
      setForm({
        ...form,
         dateNaisseance: formatted,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createEmployee({...form}));
      navigate("/");
    };
    
  const logoutUser = () => {
    dispatch(logout(navigate));
  };





  return (
    <div>
      <div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>
    <div  className="page-container ">
      {/* <div className="sidebar-link-container"> */}
        <Sidebar links={getSidebarLinks("admin", 2)} />
      {/* </div> */}

      <div className="others">
      <h1 className="form-heading">Ajouter Employé</h1>
        <br></br>
        
      <div className='form-form'>
      <form onSubmit={handleSubmit} className="form-custom-add familyFix" action='#'>

        <div className="form-group-custom"><br/>
          <div>
          <input
            className="margin-left form-input-customs"
            placeholder="Nom"
            onChange={handleChange}
            id="username"
            name="nom"
            type="text"
            required
          />
         
           </div><br/>
          <input
            className="margin-left margin-right form-input-customs"
            placeholder="Prénom"
            onChange={handleChange}
       
            name="prenom"
            type="text"
            required
          />
        
          <input
            type="date"
            data-date=""
            data-date-format="ddmmyyyy"
            onChange={onChangeDateHandler}
            required
            name="DateNaisseance"
            className="margin-left form-input-customs"
            
          /> <br/>
         
        </div>
        {/* <div className="form-group-custom">
          <input
            type="text"
            placeholder="wilaya"
            onChange={handleChange}
            name="wilaya"
            className="margin-left"
          />
          <input
            type="text"
            placeholder="daira"
            onChange={handleChange}
            name="daira"
            className="margin-left"
          />
            <input
            className="margin-left"
            type="text"
            placeholder="mairie"
            onChange={handleChange}
            name="mairie"
          />
        </div> */}
        <div className="form-group-custom">
          <input
            type="text"
            placeholder="Numéro de téléphone"
            onChange={handleChange}
            name="numTel"
            className="margin-left form-input-customs"
            required
            minlength='10'
            maxLength={10}
          />
         
          <br/>
          <input
            type="text"
            placeholder="Situation familliale"
            onChange={handleChange}
 
            required
            name="situation"
            className="margin-right margin-left form-input-customs"
          /><br/>
          <input
            type="text"
            placeholder="CID"
            onChange={handleChange}
            name="numIdentite"
            className="margin-left form-input-customs"
          /><br/>
        
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
            name="username"
            className="margin-right form-input-customs"
            required
          /><br/>
          <input
            type="text"
            placeholder="Mot de passe"
            onChange={handleChange}
            name="password"
            className="margin-left form-input-customs"
            required
          />
        </div><br/>

        <div className="form-group"> 
         <select
            onChange={handleChange}
            className="form-select-custom"
            aria-label="Default select example"
            defaultValue=""
            required
            name="role"
          >
            <option value="" disabled> Privilège </option>
            {privilegesDemo.map((privilege) => {
              return (
                <option key={privilege.id} value={privilege.name}>
                  {privilege.name}
                </option>
              );
            })}
          </select> 
          <br/>
          <input
            type="text" required
         
            placeholder="Numéro de sécurité sociale"
            onChange={handleChange}
            name="nss"
            className="margin-left form-input-custom"
          />
<br/>

         </div> <br/>
        {/* <div className="form-group-custom">
        {form.privilege==1 &&   <select
            onChange={handleChange}
            className="form-select-custom small-select margin-left margin-right"
            aria-label="Default select example"
            defaultValue="0"
            name="profession"
          >
            {/* <option value="">Zanimanje</option> */}
            {/* <option value="Med. sestra">Med. sestra</option>
            <option value="Spec. biohemicar">Spec. biohemicar</option>
            <option value="Spec. gastroenterolog."> Spec. gastroenterolog</option>
            <option value="Spec. ginekolog">Spec. ginekolog</option>
            <option value="Spec. endrokrinolog">Spec. endrokrinolog</option> */}
            {/* <option value="Spec. kardiolog">Spec. kardiolog</option>
            <option value="Spec. neurolog">Spec. neurolog</option> */}
            {/* <option value="Spec. nefrolog">Spec. nefrolog</option>
            <option value="Spec. pshijatar">Spec. pshijatar</option>
            <option value="Spec. pulmolog">Spec. pulmolog</option>
            <option value="Spec. urolog">Spec. urolog</option>
            <option value="Spec. hematolog">Spec. hematolog</option>
            <option value="Spec. hirurg">Spec. hirurg</option> */}
          {/* </select>} */}
         
         
        {/* </div> */}

        <div className="form-group-custom">
          <div className="wrapper">
            <input
              type="radio"
              name="sexe"
              id="option-1"
              value="Homme"
              onChange={handleChange}
              checked
            />
            <input
              type="radio"
              name="sexe"
              value="Femme"
              id="option-2"
              onChange={handleChange}
            />
            <label htmlFor="option-1" className="option option-1">
              <div className="dot"></div>
              <span>Homme</span>
            </label>
            <label htmlFor="option-2" className="option option-2">
              <div className="dot"></div>
              <span>Femme</span>
            </label>
          </div><br/>
        </div>
        <br></br>
        <button type="submit" className='submit-buttona'   >Ajouter</button>
      </form>
      </div>
      </div>
    </div>
    </div>
 
  )
}
