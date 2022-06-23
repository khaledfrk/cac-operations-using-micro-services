import React, { useEffect, useLayoutEffect, useState } from 'react'
import avatar from '../../../assets/avatar 1.png';
import alert from '../../../assets/alert.png';
import "./style.css"
import { createDetailOperationAnesth, getOperationById } from '../../../redux/actions/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../../../redux/actions/products';



const initialState = {
    products: [],
    protocoleAnesthesie: {
        technique: "techh",
        sitePonction: "bras",
        materiel: "materiel2",
        agent: "hypnotique",
        nature: "nature2",
        doseInduction: 10.0,
        doseEntretien: 10.0
    }
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


export default function AnesthesisteFormPage() {

    // const [operationss, setPatient] = useState(initialStateOp);
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState();
    const operation = useSelector((state) => state.operationsReducer);
    const products = useSelector((state) => state.productReducer);

    useEffect(() => {
        const pathParts = location.pathname.split("/");
        setPath(pathParts[pathParts.length - 1]);
        dispatch(getOperationById(pathParts[pathParts.length - 1]));
        dispatch(getProducts());
    }, []);


    const handleChange = (e) =>
        setForm(
            {
                products: [...form.products],
                protocoleAnesthesie: {
                    ...form.protocoleAnesthesie,

                    [e.target.name]: e.target.value
                },
            }
        );





    const [formFields, setFormFields] = useState([

        {
            categorie: "",
            datePeremption: "",
            delai: "",
            nlot: "",
            nomP: "",
            prixP: "",
            productId: "",
            qntP: "",
            typeP: "",

        }
    ])

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        const lastitem = data[index];
        let item = products[event.target.value]
        data[index] = { ...lastitem, ...item };
        setFormFields(data);
        console.log(data);
        setForm({
            products: data,
            protocoleAnesthesie: { ...form.protocoleAnesthesie },
        });
    }

    const handeleChangeQuantity = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = parseInt(event.target.value);
        setFormFields(data);
        console.log(data);

        setForm({
            products: data,
            protocoleOperatoire: { ...form.protocoleOperatoire }
        })

    }



    const addFields = () => {
        let object = {
            categorie: "",
            datePeremption: "",
            delai: "",
            nlot: "",
            nomP: "",
            prixP: "",
            productId: "",
            qntP: 0,
            typeP: "",
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDetailOperationAnesth({ ...form }, path));
        navigate("/anesth")
    };

    console.log(operation);
    return (
        (operation.length !== 0) ? (
            <div className="page-container">

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
                                    Operation {path}
                                </div>
                            </div>
                        </div>
                        <div className="form-form2">
                            <div className='form'>
                                <form onSubmit={handleSubmit} className="form-custom familyFix form-start">
                                    <h1 className="form-heading">Formulaire d'anesthésiste </h1>
                                    <br></br>
                                    <div className="App">
                                        <div className="subheading-container">
                                            <h1 className="form-subheading">Produits utilisés</h1>
                                        </div>
                                        {formFields.map((form, index) => {
                                            return (
                                                <div className="multiple form-group-custom" key={index}>

                                                    <select
                                                        onChange={event => handleFormChange(event, index)}
                                                        className="form-select-custom"
                                                        aria-label="Default select example"
        
                                                    >
                                                        <option value="" disabled> Produit </option>
                                                        {products.map((product, index) => {
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
                                                        placeholder='quantité'
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
                                    <h1 className="form-subheading">Protocole Anesthésique</h1>
                                    <div className="form-group-custom">

                                        <input
                                            className="margin-left margin-right"
                                            placeholder="Technique"
                                            onChange={handleChange}
                                            name="technique"
                                            type="text"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Site ponction"
                                            onChange={handleChange}
                                            name="sitePonction"
                                            className="margin-left"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Matériel"
                                            onChange={handleChange}
                                            name="materiel"
                                            className="margin-left"
                                        />
                                        <input
                                            className="margin-left"
                                            type="text"
                                            placeholder="Agent"
                                            onChange={handleChange}
                                            name="agent"
                                        />


                                        <input
                                            type="text"
                                            placeholder="Nature"
                                            onChange={handleChange}
                                            name="nature"
                                            className="margin-left"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Dose induction"
                                            onChange={handleChange}
                                            name="doseInduction"
                                            className="margin-right margin-left"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Dose entretien"
                                            onChange={handleChange}
                                            name="doseEntretien"
                                            className="margin-right margin-left"
                                        />


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
            </div>) : (<div>please wait</div>)
    )
}
