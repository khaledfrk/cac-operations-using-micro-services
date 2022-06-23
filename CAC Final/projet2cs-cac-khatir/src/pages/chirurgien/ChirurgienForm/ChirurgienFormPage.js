import { Avatar } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createDetailOperation, getOperationById } from '../../../redux/actions/operations';
import avatar from '../../../assets/avatar 1.png';
import alert from '../../../assets/alert.png';
import { getProducts } from "../../../redux/actions/products";
import "./style.css"

const initialState = {
  protocoleOperatoire: {
    aspect: "",
    taille: "",
    localisation: "",
    zoneEntournant: "",
    ganglionsLymphatiques: "",
    position: "",
    exerese: "",
    typeOncoplastie: "",
    lesionsLaissees: "",
    curageGanglionnaire:{},
    drainageExterne:{},
    piecesPrelevees:{},
  },
  products:[],
};

const initialStateOp = {
  operationType: "",
  patient: {
    dateNaissance: "",
    nom: "",
    prenom: "",
    lieuNaissance: ""
  }
}



export default function ChirurgienFormPage() {

  const [operationss, setPatient] = useState(initialStateOp);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState();
  const operation = useSelector((state) => state.operationsReducer);
  const products = useSelector((state) => state.productReducer);


  // useEffect(()=>{
  //   const pathParts = location.pathname.split("/");
  //   setPath(pathParts[pathParts.length - 1]);
  //   dispatch(getOperationById(pathParts[pathParts.length - 1]));
  // },[])

  useLayoutEffect(() => {
    const pathParts = location.pathname.split("/");
    setPath(pathParts[pathParts.length - 1]);
    dispatch(getOperationById(pathParts[pathParts.length - 1]));
    dispatch(getProducts());
  }, [])


  // console.log(operation);



  const [formFields, setFormFields] = useState([
    {
      categorie: "",
      datePeremption:"",
      delai:"",
      nlot:"",
      nomP:"",
      prixP:"",
      productId:"",
      qntP:"",
      typeP:"",

    }
  ]);


  // const prod=[
  //   {
  //     categorie: "aa",
  //     datePeremption:"aa",
  //     delai:"sj",
  //     nlot:"js",
  //     nomP:"1",
  //     prixP:"sjs",
  //     productId:1,
  //     qntP:0,
  //     typeP:"sk",
  //   },
  //   {
  //     categorie: "aa",
  //     datePeremption:"aa",
  //     delai:"sj",
  //     nlot:"js",
  //     nomP:"2",
  //     prixP:"sjs",
  //     productId:2,
  //     qntP:0,
  //     typeP:"sk",
  //   },
  //   {
  //     categorie: "aa",
  //     datePeremption:"aa",
  //     delai:"sj",
  //     nlot:"js",
  //     nomP:"3",
  //     prixP:"sjs",
  //     productId:3,
  //     qntP:0,
  //     typeP:"sk",
  //   },
  // ]

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    const lastitem =data[index];
    let item= products[event.target.value]
    data[index] ={...lastitem,...item};
    setFormFields(data);
    console.log(data);
    setForm({
      products:data,
      protocoleOperatoire: { ...form.protocoleOperatoire },
    });
    // console.log(form);
  }

  const handeleChangeQuantity=(event, index)=>{
    let data = [...formFields];
    data[index][event.target.name] =parseInt(event.target.value);
    setFormFields(data);
    console.log(data);

    setForm({
      products:data,
      protocoleOperatoire:{...form.protocoleOperatoire}
    })

  }

 

  const addFields = () => {
    let object = {
         categorie: "",
          datePeremption:"",
          delai:"",
          nlot:"",
          nomP:"",
          prixP:"",
          productId:"",
          qntP:0,
          typeP:"",
    }
    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)


    console.log(data);
  }



  const handleChange = (e) =>{

    setForm(
      {
        products:[...form.products],
        protocoleOperatoire: {
          ...form.protocoleOperatoire,
          [e.target.name]: e.target.value
        },
      }
      );

      console.log(form);
  }

  const handleChangecurage = (e) =>
    setForm(
      {
        products:[...form.products],
        protocoleOperatoire: {
          ...form.protocoleOperatoire,
          curageGanglionnaire: { ...form.protocoleOperatoire.curageGanglionnaire, [e.target.name]: e.target.value }
        },
      }
    );
  const handleChangepiece = (e) =>{

    setForm(
      {
        products:[...form.products],
        protocoleOperatoire: {
          ...form.protocoleOperatoire,
          piecesPrelevees: { ...form.protocoleOperatoire.piecesPrelevees, [e.target.name]: e.target.value }
        },
      }
    );
    console.log(form);
  }

  const handleChangedrainage = (e) =>{

    setForm(
      {
        products:[...form.products],
        protocoleOperatoire: {
          ...form.protocoleOperatoire,
          drainageExterne: { ...form.protocoleOperatoire.drainageExterne, [e.target.name]: e.target.value }
        },
      }
      );
      console.log(form);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDetailOperation({ ...form }, path));
    navigate("/doctor")
  };



  return (
    (operation.length !== 0) ?
     ( <div className="page-container">

        <div>
          <div className="sidebar-container-form">
            <div className="sidebareWrapper">
              <span className="logo"><img src={avatar} width="100px" alt="logo" /></span>
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
                  Operation  {path}
                </div>

              </div>
            </div>
            <div className="form-form2">
              <div className='form'>
                <form onSubmit={handleSubmit} className="form-custom familyFix form-start">
                  <h1 className="form-heading">Formulaire du chirurgien</h1>
                  <br></br><br></br>
                  {/* <Autocomplete
              multiple
              className="auto"
              id="tags-outlined"
              options={doctors}
              sx={{ width: 400 }}
              getOptionLabel={(option) => option.nom}
              // defaultValue={[doctors[2]]}
              filterSelectedOptions
              onChange={handleChangeMultipleD}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="residents"
                  placeholder="Ajouter résident"
                  
                />
              )} */}
                  {/* /> */}
                  <br></br>
                  <div className="App">
                    <div className="subheading-container">
                      <h1 className="form-subheading">Produits utilisés</h1>
                    </div>
                    {formFields.map((form, index) => {
                      return (
                        <div className="multiple form-group-custom" key={index}>

                          <select
                            onChange={event => handleFormChange(event,index)}
                            className="form-select-custom"
                            aria-label="Default select example"
                            // name="nomP"
                          >
                            <option value="" disabled> Produit </option>
                            {products.map((product,index) => {
                              return (
                                <option key={product.productId} value={index}>
                                  {product.nomP}
                                </option>
                              );
                            })}
                          </select>
                          <input
                            type='number'
                            name='qntP'
                            placeholder='Quantité'
                            onChange={event => handeleChangeQuantity(event, index)}
                            // value={form.qte}
                            className="qt"
                          />
                          <button className="btn-clck2" type="button" onClick={() => removeFields(index)}>Supprimer</button>
                        </div>
                      )
                    })}

                    <button onClick={addFields} type="button" className="btn-clck2">Ajouter plus..</button>
                    <br />
                  </div>


                  <br></br>
                  <h1 className="form-subheading">Protocole opératoire</h1>
                  <div className="form-group-custom">
                    <input
                      className="margin-left"
                      placeholder="Taille"
                      onChange={handleChange}
                      name="taille"
                      type="number"
                    />
                    <input
                      className="margin-left margin-right"
                      placeholder="Aspect"
                      onChange={handleChange}
                      name="aspect"
                      type="text"
                    />


                    <input
                      type="text"
                      placeholder="Localisation"
                      onChange={handleChange}
                      name="localisation"
                      className="margin-left"
                    />
                    <input
                      type="text"
                      placeholder="Zone Entournant"
                      onChange={handleChange}
                      name="zoneEntournant"
                      className="margin-left"
                    />
                    <input
                      className="margin-left"
                      type="text"
                      placeholder="Ganglions Lymphatiques"
                      onChange={handleChange}
                      name="ganglionsLymphatiques"
                    />
                    <div className="selection-container">
                      <label htmlFor="position" className="label-selection">Position:</label>
                      <select name="position" id="position"
                        onChange={handleChange}
                        className="margin-left selection-style">
                        <option value="DécubitusDorsal">décubitus dorsal</option>
                        <option value="DécubitusVentral">décubitus ventral</option>
                        <option value="DécubitusLateral_G">décubitus latéral gauche</option>
                        <option value="DécubitusLateral_D">décubitus latéral droite</option>
                        <option value="Angle_du_bras_Homolateral"> angle du bras homolatéral</option>
                        <option value="GanglionSentinelle">ganglion sentinelle</option>
                      </select>
                    </div>

                    <div className="selection-container">
                      <label htmlFor="exerese" className="label-selection"
                        onChange={handleChange}
                      >Exerse:</label>
                      <select name="exerese" id="exerse" className="margin-left selection-style">
                        <option value="Partielle">partielle</option>
                        <option value="Total">total</option>
                      </select>
                    </div>

                    <div className="selection-container">
                      <label htmlFor="typeOncoplastie"
                        onChange={handleChange}
                        className="label-selection-long">Type Oncoplastie:</label>
                      <select name="typeOncoplastie" id="typeOncoplastie" className="margin-left selection-style">
                        <option value="T_inverse">T inversé</option>
                        <option value="vertical_pure">vertical pure</option>
                        <option value="J">J</option>
                        <option value="L"> L</option>
                        <option value="péri_aréolaire">péri aréolaire</option>
                        <option value="T">T</option>
                        <option value="Omega">Omega</option>
                        <option value="interne_avec_rotation_glandulaire">interne avec rotation glandulaire</option>
                        <option value="horizentale">Horizentale</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Lesions laisses"
                      onChange={handleChange}
                      name="lesionsLaissees"
                      className="margin-left"
                    />



                    <h1 className="form-subsubheading">Curage ganlionnaire</h1>
                    <div className="form-group-custom">
                      <input
                        type="text"
                        placeholder="Type "
                        onChange={handleChangecurage}
                        name="typeCurage"
                        className="margin-right margin-left"
                      />

                      <input
                        type="text"
                        placeholder="Extension "
                        onChange={handleChangecurage}
                        name="extension"
                        className="margin-right margin-left"
                      />

                      <input
                        type="text"
                        placeholder="Autre "
                        onChange={handleChangecurage}
                        name="autre"
                        className="margin-right margin-left"
                      />
                    </div>

                    <h1 className="form-subsubheading">Drainage externe</h1>
                    <div className="form-group-custom">
                      <input
                        type="text"
                        placeholder="Type "
                        onChange={handleChangedrainage}
                        name="typeDrainage"
                        className="margin-right margin-left"
                      />

                      <input
                        type="number"
                        placeholder="Nombre"
                        onChange={handleChangedrainage}
                        name="nbDrainage"
                        className="margin-right margin-left"
                      />

                      <input
                        type="text"
                        placeholder="Topographie "
                        onChange={handleChangedrainage}
                        name="topographieDrainage"
                        className="margin-right margin-left"
                      />
                    </div>

                    <h1 className="form-subsubheading">Pièces prélevées</h1>
                    <div className="form-group-custom">
                      <input
                        type="text"
                        placeholder="Topographie "
                        onChange={handleChangepiece}
                        name="topographiePiecesPrelevees"
                        className="margin-right margin-left"
                      />

                      <input
                        type="number"
                        placeholder="Poids"
                        onChange={handleChangepiece}
                        name="poids"
                        className="margin-right margin-left"
                      />

                      <input
                        type="text"
                        placeholder="Orientation "
                        onChange={handleChangepiece}
                        name="orientation"
                        className="margin-right margin-left"
                      />

                      <input
                        type="number"
                        placeholder="Numéro flacon "
                        onChange={handleChangepiece}
                        name="numFlacon"
                        className="margin-right margin-left"
                      />

                      <input
                        type="text"
                        placeholder="Type fixation "
                        onChange={handleChangepiece}
                        name="typeFixation"
                        className="margin-right margin-left"
                      />
                    </div>
                  </div>

                  <br></br>

                  <div className='btn'>
                    <button onClick={handleSubmit} className='btn-clck'>Terminer </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (<div>please wait</div>)
  )
  
}
