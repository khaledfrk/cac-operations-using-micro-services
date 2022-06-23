import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createDetailOperation, getOperationById } from '../../../redux/actions/operations';
import avatar from '../../../assets/avatar 1.png';
import alert from '../../../assets/alert.png';



const initialState = {
    // listproduit:[],
    protocoleOperatoire: {
        aspect: "",
        taille: 1,
        localisation: "a",
        zoneEntournant: "a",
        ganglionsLymphatiques: "a",
        position: "a",
        exerese: "a",
        typeOncoplastie: "aa",
        lesionsLaissees: "aaa",
        drainageExterne: {

            typeDrainage: "",
            topographieDrainage: "",
            nbDrainage: 1

        },
        curageGanglionnaire: {
            autre: "",
            extension: "",
            typeCurage: ""
        },
        piecesPrelevees: {
            topographiePiecesPrelevees: "",
            poids: 1,
            numFlacon: "",
            typeFixation: ""
        },

    },
};

const initialStateOp = {
    operationType: "",
    patient: {
        dateNaissance: "",
        nom: " sss",
        prenom: "",
        lieuNaissance: ""
    }
}
export default function EditFormChirurgien() {






    const [operationss, setPatient] = useState(initialStateOp);
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState();
    const operation = useSelector((state) => state.operationsReducer);

    
    useEffect(() => {
        const pathParts = location.pathname.split("/");
        setPath(pathParts[pathParts.length - 1]);
        dispatch(getOperationById(pathParts[pathParts.length - 1]));
        setTimeout(() => {
            console.log("aaa");
        }, 3000);
    },[])



    useEffect(() => {

        if (operation.length !== 0) {
            setForm({
                ...form,
                protocoleOperatoire: {
                    aspect: operation.details.protocoleOperatoire.aspect,
                    taille: operation.details.protocoleOperatoiretaille,
                    localisation: operation.details.protocoleOperatoire.localisation,
                    zoneEntournant: operation.details.protocoleOperatoire.zoneEntournant,
                    ganglionsLymphatiques: operation.details.protocoleOperatoire.ganglionsLymphatiques,
                    position: operation.details.protocoleOperatoire.position,
                    exerese: operation.details.protocoleOperatoire.exerese,
                    typeOncoplastie: operation.details.protocoleOperatoire.typeOncoplastie,
                    lesionsLaissees: operation.details.protocoleOperatoire.lesionsLaissees,

                    curageGanglionnaire: {
                        autre: operation.details.protocoleOperatoire.curageGanglionnaire.autre,
                        extension: operation.details.protocoleOperatoire.curageGanglionnaire.extension,
                        typeCurage: operation.details.protocoleOperatoire.curageGanglionnaire.typeCurage,
                    },
                    drainageExterne: {
                        nbDrainage: operation.details.protocoleOperatoire.drainageExterne.nbDrainage,
                        topographieDrainage: operation.details.protocoleOperatoire.drainageExterne.topographieDrainage,
                        typeDrainage: operation.details.protocoleOperatoire.drainageExterne.typeDrainage,
                    },
                    piecesPrelevees: {
                        topographiePiecesPrelevees: operation.details.protocoleOperatoire.piecesPrelevees.topographiePiecesPrelevees,
                        poids: operation.details.protocoleOperatoire.piecesPreleveespoids,
                        orientation: operation.details.protocoleOperatoire.piecesPrelevees.orientation,
                        numFlacon: operation.details.protocoleOperatoire.piecesPrelevees.numFlacon,
                        typeFixation: operation.details.protocoleOperatoire.piecesPrelevees.typeFixation
                    }


                }
            });
        }
    }, [operation]);







    // const [doctorsre,setDoctors]=useState([])

    // const handleChangeMultipleD=(e,v)=>{
    //   v.map(e=>{
    //     let data=[...doctorsre, e];
    //     setDoctors([...doctorsre, e])
    //     setForm({
    //       protocolOperatoire:{...form.protocolOperatoire},
    //      },
    //      );
    //   })

    // }


    const [formFields, setFormFields] = useState([
        { nomP: '', qntP: '' },
    ])

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);

        console.log(data);
        setForm({
            // listproduit:data,
            protocoleOperatoire: { ...form.protocoleOperatoire },
        });
    }

    // const submit = (e) => {
    //   e.preventDefault();
    //   console.log(formFields);
    // }

    const addFields = () => {
        let object = {
            nomP: '',
            qntP: ''
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)


        console.log(data);
    }



    const handleChange = (e) =>
        setForm(
            {
                // listproduit:[...form.listproduit],
                protocoleOperatoire: {
                    ...form.protocoleOperatoire,
                    // ...form.protocoleOperatoire.curageGanglionnaire,
                    // ...form.protocoleOperatoire.drainageExterne,
                    // ...form.protocoleOperatoire.piecesPrelevees,
                    [e.target.name]: e.target.value
                },
            }
        );

    const handleChangecurage = (e) =>
        setForm(
            {
                // listproduit:[...form.listproduit],
                protocoleOperatoire: {
                    ...form.protocoleOperatoire,
                    curageGanglionnaire: { ...form.protocoleOperatoire.curageGanglionnaire, [e.target.name]: e.target.value }
                },
            }
        );
    const handleChangepiece = (e) =>
        setForm(
            {
                // listproduit:[...form.listproduit],
                protocoleOperatoire: {
                    ...form.protocoleOperatoire,
                    piecesPrelevees: { ...form.protocoleOperatoire.piecesPrelevees, [e.target.name]: e.target.value }
                },
            }
        );

    const handleChangedrainage = (e) =>
        setForm(
            {
                // listproduit:[...form.listproduit],
                protocoleOperatoire: {
                    ...form.protocoleOperatoire,
                    drainageExterne: { ...form.protocoleOperatoire.drainageExterne, [e.target.name]: e.target.value }
                },
            }
        );



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDetailOperation({ ...form }, path));
        //   navigate("/doctor")
    };


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
                                Ce patieint n'est pas tolérant à certains produits.
                            </div>
                            <div className="info-wrapper">
                                <div className="patient-info">

                                    <h1 className="form-subheading-info">Date naissance: </h1> <p className="p-info">{operation.patient.dateNaissance}</p>
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
                                                    <input
                                                        type="text"
                                                        name='nomP'
                                                        placeholder='nom produit'
                                                        onChange={event => handleFormChange(event, index)}
                                                        value={form.name}
                                                        className="nomProduit"
                                                    />
                                                    <input
                                                        type='number'
                                                        name='qntP'
                                                        placeholder='quantité'
                                                        onChange={event => handleFormChange(event, index)}
                                                        value={form.qte}
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
                                            value={form.protocoleOperatoire.taille}
                                        />
                                        <input
                                            className="margin-left margin-right"
                                            placeholder="Aspect"
                                            onChange={handleChange}
                                            name="aspect"
                                            value={form.protocoleOperatoire.aspect}
                                            type="text"
                                        />


                                        <input
                                            type="text"
                                            placeholder="Localisation"
                                            onChange={handleChange}
                                            name="localisation"
                                            className="margin-left"
                                            value={form.protocoleOperatoire.localisation}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Zone Entournant"
                                            onChange={handleChange}
                                            name="zoneEntournant"
                                            className="margin-left"
                                            value={form.protocoleOperatoire.zoneEntournant}
                                        />
                                        <input
                                            className="margin-left"
                                            type="text"
                                            placeholder="Ganglion Slymphatique"
                                            onChange={handleChange}
                                            value={form.protocoleOperatoire.ganglionsLymphatiques}
                                            name="ganglionsLymphatiques"
                                        />
                                        <div className="selection-container">
                                            <label htmlFor="position" className="label-selection">Position:</label>
                                            <select name="position" id="position"
                                                onChange={handleChange}
                                                value={form.protocoleOperatoire.position}
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
                                            <select
                                                value={form.protocoleOperatoire.exerese}
                                                name="exerese" id="exerse" className="margin-left selection-style">
                                                <option value="Partielle">partielle</option>
                                                <option value="Total">total</option>
                                            </select>
                                        </div>

                                        <div className="selection-container">
                                            <label htmlFor="typeOncoplastie"
                                                onChange={handleChange}
                                                value={form.protocoleOperatoire.typeOncoplastie}
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
                                            placeholder="lesions laisses"
                                            onChange={handleChange}
                                            value={form.protocoleOperatoire.lesionsLaissees}
                                            name="lesionsLaissees"
                                            className="margin-left"
                                        />



                                        <h1 className="form-subsubheading">Curage ganlionnaire</h1>
                                        <div className="form-group-custom">
                                            <input
                                                type="text"
                                                placeholder="type "
                                                onChange={handleChangecurage}
                                                name="typeCurage"
                                                className="margin-right margin-left"
                                            value={form.protocoleOperatoire.curageGanglionnaire.typeCurage}
                                            />

                                            <input
                                                type="text"
                                                placeholder="extension "
                                                onChange={handleChangecurage}
                                                name="extension"
                                                className="margin-right margin-left"
                                            value={form.protocoleOperatoire.curageGanglionnaire.extension}
                                            />

                                            <input
                                                type="text"
                                                placeholder="autre "
                                                onChange={handleChangecurage}
                                                name="autre"
                                                value={form.protocoleOperatoire.curageGanglionnaire.autre}
                                                className="margin-right margin-left"
                                            />
                                        </div>

                                        <h1 className="form-subsubheading">Drainage externe</h1>
                                        <div className="form-group-custom">
                                            <input
                                                type="text"
                                                value={form.protocoleOperatoire.drainageExterne.typeDrainage}
                                                placeholder="type "
                                                onChange={handleChangedrainage}
                                                name="typeDrainage"
                                                className="margin-right margin-left"
                                            />

                                            <input
                                                type="number"
                                                value={form.protocoleOperatoire.drainageExterne.nbDrainage}
                                                placeholder="nombre"
                                                onChange={handleChangedrainage}
                                                name="nbDrainage"
                                                className="margin-right margin-left"
                                            />

                                            <input
                                                type="text"
                                                value={form.protocoleOperatoire.drainageExterne.topographieDrainage}
                                                placeholder="topographie "
                                                onChange={handleChangedrainage}
                                                name="topographieDrainage"
                                                className="margin-right margin-left"
                                            />
                                        </div>

                                        <h1 className="form-subsubheading">Piece prelevees</h1>
                                        <div className="form-group-custom">
                                             
                                            
                                                <input

                                                    value={form.protocoleOperatoire.piecesPrelevees.topographiePiecesPrelevees}
                                                    type="text"
                                                    placeholder="topographie "
                                                    onChange={handleChangepiece}
                                                    name="topographiePiecesPrelevees"
                                                    className="margin-right margin-left"
                                                />
                                                


                                            <input
                                                 value={form.protocoleOperatoire.piecesPrelevees.poids}
                                                type="number"
                                                placeholder="poids"
                                                onChange={handleChangepiece}
                                                name="poids"
                                                className="margin-right margin-left"
                                            />

                                            <input
                                                 value={form.protocoleOperatoire.piecesPrelevees.orientation}
                                                type="text"
                                                placeholder="orientation "
                                                onChange={handleChangepiece}
                                                name="orientation"
                                                className="margin-right margin-left"
                                            />

                                            <input
                                                   value={form.protocoleOperatoire.piecesPrelevees.numFlacon}
                                                type="number"
                                                placeholder="numero flacon "
                                                onChange={handleChangepiece}
                                                name="numFlacon"
                                                className="margin-right margin-left"
                                            />

                                            <input
                                                 value={form.protocoleOperatoire.piecesPrelevees.typeFixation}
                                                type="text"
                                                placeholder="type fixation "
                                                onChange={handleChangepiece}
                                                name="typeFixation"
                                                className="margin-right margin-left"
                                            />
                                        </div>
                                    </div>

                                    <br></br>

                                    <div className='btn'>
                                        <button onClick={handleSubmit} className='btn-clck'>Edit operation </button>
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
