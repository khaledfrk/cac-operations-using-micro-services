import React, { useEffect, useLayoutEffect, useState } from 'react'
import avatar from '../../../assets/avatar 1.png';
import alert from '../../../assets/alert.png';
import "./style.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDetailOperationCoor, getOperationById } from '../../../redux/actions/operations';


const initialState = {

}

export default function CoordinateurFormAvantPage() {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState();
    const operation = useSelector((state) => state.operationsReducer);

    const [formFields, setFormFields] = useState([
        { name: 'product1', qtP: '4' }, { name: 'product4', qtP: '40' }, { name: 'product1', qtP: '4' }, { name: 'product4', qtP: '40' },
    ])

    useEffect(() => {
        const pathParts = location.pathname.split("/");
        setPath(pathParts[pathParts.length - 1]);
        dispatch(getOperationById(pathParts[pathParts.length - 1]));
    }, []);


    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
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

    const handelchange = (e) => {
        setForm({
            ...form,
            dateDebutBloc: e.target.value,
        });
        console.log(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDetailOperationCoor({ ...form }, path));
        navigate("/coordinateur");
    };

    
    return (
        (operation.length !== 0) ?
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
                                Opération {path}
                            </div>
                        </div>
                    </div>
                    <div className="form-form2">
                        <div className='form'>
                            <form onSubmit={handleSubmit} className="form-custom familyFix form-start">
                                <h1 className="form-heading">Formulaire de coordinateur per-opératoire</h1>
                                <br></br>
                                <div className="App">
                                    <div className="subheading-container">
                                        <h1 className="form-subheading">Produits choisis par le chirurgien</h1>
                                    </div>

                                     {operation.details.produitsCh.map((product, index) => {
                                        return (
                                            <div className="multiple form-group-custom" key={index}>

                                                <input
                                                    className="margin-left margin-right nomProduit"
                                                    name="product1"
                                                    id={index}
                                                    type="checkbox"
                                                />
                                                <label for={index} className="nomProduit label-selection "> {product.nomP} : x {product.qntP} </label>

                                            </div>
                                        )
                                    })} 
                                    <div className="subheading-container">
                                        <h1 className="form-subheading">Produits choisis par l'anesthésite</h1>
                                    </div>

                                     {operation.details.produitsAn.map((product, index) => {
                                        return (
                                            <div className="multiple form-group-custom" key={index}>

                                                <input
                                                    className="margin-left margin-right nomProduit"
                                                    name="product1"
                                                    id={index}
                                                    type="checkbox"
                                                />
                                                <label for={index} className="nomProduit label-selection "> {product.nomP} : x {product.qntP} </label>

                                            </div>
                                        )
                                    })} 


                                    <br />

                                </div>
                                <br></br>
                                <h1 className="form-subheading">Heure d'admission au bloc</h1>
                                <div className="form-group-custom">
                                    <div className="multiple form-group-custom">
                                        <input
                                            type="datetime-local"
                                            name="dateDebutBloc"
                                            onChange={handelchange}
                                            className="margin-left"
                                        />
                                    </div>
                                </div>
                                <div className='btn'>
                                    <button onClick={handleSubmit} className='btn-clck'>Terminer </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <div>Please wait</div>
    )
}
