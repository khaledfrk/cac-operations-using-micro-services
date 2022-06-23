import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSidebarLinks } from '../../../commons/sidebarLinks';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { createProduct } from '../../../redux/actions/products';
import "../AddEmployeePage/style.css"
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'
import "./style.css"


// {"productId":1,
// "nomP":"prod1",
// "qntP":250,
// "typeP":"antibiotique",
// "prixP":3000.0,
// "nlot":"nlot",
// "datePeremption":"2023-12-03T23:00:00.000+00:00",
// "delai":12}
const initialState = {
    nomP: "",
    qntP: "",
    typeP: "",
    prixP: "",
    nlot: "",
    delai: "",
    categorie:""
  };



export default function AddProductPage() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();
  
 
    

   
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
        datePeremption: formatted,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createProduct({...form}));
      console.log({...form});
      navigate("/admin/stock");
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
        <Sidebar links={getSidebarLinks("admin", 4)} />
      {/* </div> */}

      <div className="others">
      <h1 className="form-heading">Ajouter Produit</h1>
        <br></br>
        <div className='form-form'>
      <form onSubmit={handleSubmit} className="form-custom familyFix">

        <div className="form-group-custom ">
          <input
            className="margin-left form-input-customs"
            placeholder="Nom Produit"
            onChange={handleChange}
            name="nomP"
            type="text"
            required
          />
          <input
            className="margin-left margin-right form-input-customs"
            placeholder="Quantité"
            onChange={handleChange}
            name="qntP"
            type="number"
            required
          />
          <input
            type="date"
            data-date=""
            data-date-format="ddmmyyyy"
            onChange={onChangeDateHandler}
            name="datePeremption"
            className="margin-left"
            required
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            placeholder="Type produit"
            onChange={handleChange}
            name="typeP"
            className="margin-left form-input-customs"
            required
          />
          <input
            type="text"
            placeholder="Num lot"
            onChange={handleChange}
            name="nlot"
            required
            className="margin-left form-input-customs"
          />
            <input
            className="margin-left form-input-customs"
            type="number"
            placeholder="Délai"
            onChange={handleChange}
            name="delai"
            required
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            placeholder="Catégorie"
            onChange={handleChange}
            name="categorie"
            className="margin-left form-input-customs"
            required
          />
          <input
            type="number"
            placeholder="Prix"
            onChange={handleChange}
            name="prixP"
            className="margin-left form-input-customs"
            required
          />
         
        
        </div>
        
        <br></br>
        <button  className='submit-buttona'>Ajouter Produit</button>
      </form>
      </div>
      </div>
    </div>
    </div>
  )
}
