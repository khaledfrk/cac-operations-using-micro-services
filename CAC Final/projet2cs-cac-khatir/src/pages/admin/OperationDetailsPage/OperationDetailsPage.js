
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import Header from '../../../components/Header/Header';
import { getOperationByIdss } from '../../../redux/actions/archive';
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  





export default function OperationDetailsPage() {
    
    const operation = useSelector((state) => state.operationarchiveReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState();
  
  
  
  
    useEffect(() => {
      const pathParts = location.pathname.split("/");
      setPath(pathParts[pathParts.length - 1]);
      dispatch(getOperationByIdss(pathParts[pathParts.length - 1]));
    },[])
  



    const headerProps = {
        // avatarUrl: "nikolaSlika 1.jpg",
        welcomeMsg: "",
        userName: "Détails d'opération",
        userTitle: "",
        buttonPage: ""
    };
    const logoutUser = () => {
        dispatch(logout(navigate));
      };
  
    return (

     (operation.length !=0)?

        <div>
<div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>
            <div className="page-container">

                <Sidebar links={getSidebarLinks("admin", 5)} styel=" position: fixed; z-index: 1;" />

                <div className='others '>
                    <Header
                        avatarUrl={headerProps.avatarUrl}
                        welcomeMsg={headerProps.welcomeMsg}
                        userName={headerProps.userName}
                        userTitle={headerProps.userTitle}
                    />
                    <div className='form-form'>
                        <div className='username-container'>
                    {(operation.statAnesthesiste)&&(operation.statChirugien)&&(operation.statCoordinateur)?<div className='yay'>L'opération est complète!</div>:<div className='nay'>operation not complete</div>}  
                    </div>
                      
                        <div>
                            <h1 className='form-subheading'>Operation numéro: {operation.idOperation}</h1>
                            <div className='flexy'> <p className='form-subsubheading-color'>Début de l'opération:</p><div className='marginy'>{operation.startAt}</div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Fin de l'opération:</p><div className='marginy'>{operation.endAt}</div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Pathologie:</p><div className='marginy'>{operation.operationType}</div> </div>

                            <div className='flexy'> <p className='form-subsubheading-color'>Salle:</p><div className='marginy'> {operation.salle.nom} </div> </div>

                            <hr></hr><hr></hr>        
                     
                            <div className='form-subheading'>Responsables:</div>

                            {
                                operation.personnels.map(e=><>
                                 <div className='flexy'> <p className='form-subsubheading-color'>Nom:</p><div className='marginy'>{e.nom} </div> </div>
                                 <div className='flexy'> <p className='form-subsubheading-color'>Numéro de téléphone:</p><div className='marginy'>{e.numTel}</div> </div>
                                 <div className='flexy'> <p className='form-subsubheading-color'>Sexe:</p><div className='marginy'>{e.sexe}</div> </div>
                                 <div className='flexy'> <p className='form-subsubheading-color'>Numéro d'identité:</p><div className='marginy'>{e.numIdentite} </div> </div>
                                 <div className='flexy'> <p className='form-subsubheading-color'>Role:</p><div className='marginy'>{e.role} </div> </div>
<hr></hr>

                                </>)
                            }
               <hr></hr>
                            <div  className='form-subheading' >Patient:</div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Nom:</p><div className='marginy'>{operation.patient.nom} </div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Prénom:</p><div className='marginy'>{operation.patient.prenom}</div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Groupe sanguin:</p><div className='marginy'>{operation.patient.bloodType}</div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Date de naissance:</p><div className='marginy'>{operation.patient.dateNaissance} </div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Exposition:</p><div className='marginy'>{operation.patient.exposition} </div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Taille:</p><div className='marginy'>{operation.patient.height} </div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>ID patient:</p><div className='marginy'>{operation.patient.idPatient}</div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Lieu de naissance:</p><div className='marginy'>{operation.patient.lieuNaissance} </div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Numéro d'identité:</p><div className='marginy'>{operation.patient.nidentite} </div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Numéro de téléphone:</p><div className='marginy'>{operation.patient.numTel} </div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Personne de confiance:</p><div className='marginy'>{operation.patient.personneConfiance} </div> </div>

                            <div className='flexy'> <p className='form-subsubheading-color'>Situation familiale:</p><div className='marginy'>{operation.patient.situation}</div> </div>
                            <div className='flexy'> <p className='form-subsubheading-color'>Poids:</p><div className='marginy'>{operation.patient.weight}</div> </div>


                            <hr></hr><hr></hr>

                            <div className='form-subheading'>Details</div>

                            {(operation.statCoordinateur===true)?
                             <>
                                                         
                                                         <div className='flexy'> <p className='form-subsubheading-color'>Date début de réveil:</p><div className='marginy'>{operation.details.dateDebutBloc}</div> </div>
                                                         <div className='flexy'> <p className='form-subsubheading-color'>Date fin de réveil:</p><div className='marginy'>{operation.details.dateFinBloc}</div> </div>
                                                         <div className='flexy'> <p className='form-subsubheading-color'>Incidents:</p><div className='marginy'>{operation.details.incidents}</div></div>
                                                         <div className='flexy'> <p className='form-subsubheading-color'>Accidents:</p><div className='marginy'>{operation.details.accidents}</div> </div> 

                             </>:null


                            }

<hr></hr><hr></hr>
                                {(operation.statChirugien===true)?
                                <>
                                <div className='form-subheading'>Protocol Operatoire</div>
                                <div className='flexy'> <p className='form-subsubheading-color'>Aspect:</p><div className='marginy'>{operation.details.protocoleOperatoire.aspect}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Ganglions lymphatiques:</p><div className='marginy'>{operation.details.protocoleOperatoire.ganglionsLymphatiques}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Lesions laisses:</p><div className='marginy'>{operation.details.protocoleOperatoire.lesionsLaissees}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Localisation:</p><div className='marginy'>{operation.details.protocoleOperatoire.localisation}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Position:</p><div className='marginy'>{operation.details.protocoleOperatoire.position}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Taille</p><div className='marginy'>{operation.details.protocoleOperatoire.taille}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Type oncoplastie:</p><div className='marginy'>{operation.details.protocoleOperatoire.typeOncoplastie}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Zone entournant:</p><div className='marginy'>{operation.details.protocoleOperatoire.zoneEntournant}</div> </div> 


                                   <hr></hr><hr></hr>

                                   </>:null
                                }

                                {
                                    (operation.statAnesthesiste===true)?
            
                                    <>
                                <div className='form-subheading'>Protocol Anesthesite</div>
                                <div className='flexy'> <p className='form-subsubheading-color'>Agent:</p><div className='marginy'>{operation.details.protocoleAnesthesie.agent}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Dose entretien:</p><div className='marginy'>{operation.details.protocoleAnesthesie.doseEntretien}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Autre:</p><div className='marginy'>{operation.details.protocoleAnesthesie.doseInduction}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Autre:</p><div className='marginy'>{operation.details.protocoleAnesthesie.materiel}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Nature:</p><div className='marginy'>{operation.details.protocoleAnesthesie.nature}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Site ponction:</p><div className='marginy'>{operation.details.protocoleAnesthesie.sitePonction}</div> </div> 
                                <div className='flexy'> <p className='form-subsubheading-color'>Technique:</p><div className='marginy'>{operation.details.protocoleAnesthesie.technique}</div> </div> 



                          

                                   
                                    </>:null
                                }
      <hr></hr><hr></hr>
                                <div className='form-subheading'>List des produits choisi par le chirurgien</div>
                                        {operation.details.produitsCh.map((product, index) => {
                                                return (
                                                    <div className="" >
                                                   {product.nomP} : x {product.qntP} 

                                                    </div>
                                                )
                                            })}
                                <div className='form-subheading'>List des produits choisi par l'anesthesiste</div>
                                {operation.details.produitsAn.map((product, index) => {
                                        return (
                                            <div className="" key={index}>

                                                 {product.nomP} : x {product.qntP} 

                                            </div>
                                        )
                                    })}


                  
                            
                        </div>

                    
                    </div>
                </div>
            </div>
        </div>:null
    )
}
