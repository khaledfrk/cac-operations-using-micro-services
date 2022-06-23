// import { TextField } from "@material-ui/core";
import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState, memo } from "react";
// import { FormSelect } from "react-bootstrap";
import "./styles.css";

const NewAppointment = (props) => {
  const {
    // avatarUrl,
    userName,
    userTitle,
    chirurgiens,
    createNewAppointment,
    date,
    setNewAppointmentVisible,
    patients,
    anesthesistes,
    coordinateurs,
    salles,
  } = props;

  // const patients=[
  //   {id:1,nom:"Abdelkdader"},
  //   {id:2,nom:"Mohamed"},
  //   {id:3,nom:"Amin"},
  //   {id:4,nom:"Boubaker"},
  // ];
  // console.log(patients);
  // const doctors=[
  //   {id:1,nom:"Dr khaled"},
  //   {id:2,nom:"Dr Monir"},
  //   {id:3,nom:"Dr Yassin"},
  //   {id:4,nom:"Dr Hichem"},
  // ];
  const type =[
    {id:1,type:"Colon"},
    {id:2,type:"Sein"},
    {id:3,type:"Uterus"},
    {id:4,type:"Estomac"},
  ];

  // const salles=[
  //   {id:1,nom:"S1"},
  //   {id:2,nom:"S2"},
  //   {id:3,nom:"S3"},
  //   {id:4,nom:"S4"},
  //   {id:5,nom:"S5"},
  // ];


  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [examinationType, setVal] = useState("");
  const [patient, setPatient] = useState({});
  const [chirurgienslist,setChirurgiens]=useState([])
  const [salle,setSalleId]=useState("");
  const [typeOp,SetTypeOp]=useState("");
  const [anesthesisteslist,setAnesthesistes]=useState([]);
  const [corrdinateur,setCorrdinateur]=useState({});
  const handleChange = (e) => setComment(e.target.value);

  const handleChangeMultipleD=(e,v)=>{
    v.map(e=>setChirurgiens([...chirurgienslist, e]))
  }
  const handleChangeMultipleA=(e,v)=>{
    v.map(e=>setAnesthesistes([...anesthesisteslist, e]))
  }

  const dateString = date.toLocaleString();
  console.log(date.toLocaleString());
  console.log(date.toISOString());
  return (
    <div className="new-appointment-container">
      <div className="new-appointment-header">
        <p className="header-paragraph familyFix">Planifier Opération</p>
        {/* <div className="new-appointment-doctor">
          <div className="doctor-container"> */}
        {/* <div className="avatar-container">
              <img className="user-avatar" src={avatarUrl} alt={userName} />
            </div> */}
        {/* <div className="name-container ">
              <p className="user-name familyFix">{userName}</p>
              <p className="user-title familyFix">{userTitle}</p>
            </div>
          </div> */}
        {/* <div className="btn-container">
            <button
              onClick={() => setIsComment(!isComment)}
              className="comment-btn familyFix"
            >
              {!isComment ? "Ajouter un commentaire" : "Supprimer le commentaire"}
            </button>
          </div> */}

        {/* {/* </div> */}
      </div>
      {/* {isComment && (
        <textarea
          style={{ width: "60%" }}
          placeholder="Commenter"
          onChange={handleChange}
          name="surname"
          type="text"
        />
      )} */}

      <div className="new-appointment-body familyFix">

        <Autocomplete
          className="dropdown1"
          disablePortal
          id="combo-box-demo"
          options={patients}
          getOptionLabel={(option) => option.nom}
          sx={{ width: 400 }}
          onChange={(e, v) =>setPatient(v)}
          renderInput={(params) => <TextField
            {...params} label="Patient" />}
        />
        <Autocomplete
          className="dropdown"
          disablePortal
          id="combo-box-demo"
          options={type}
          getOptionLabel={(option) => option.type}
          sx={{ width: 400 }}
          onChange={(e, v) => SetTypeOp(v.type)}
          renderInput={(params) => <TextField
            {...params} label="Pathologie" />}
        />

        <Autocomplete
          className="dropdown1"
          disablePortal
          id="combo-box-demo"
          options={salles}
          getOptionLabel={(option) => option.nom }
          sx={{ width: 400 }}
          onChange={(e, v) => setSalleId(v)}
          renderInput={(params) => <TextField
            {...params} label="Salle" />}
        />

        <Autocomplete
          multiple
          id="tags-outlined"
          options={chirurgiens}
          sx={{ width: 400 }}
          getOptionLabel={(option) => option.nom +" " +option.prenom}
          // defaultValue={[doctors[2]]}
          filterSelectedOptions
          onChange={handleChangeMultipleD}
          renderInput={(params) => (
            <TextField
              {...params}
              label="doctors"
              placeholder="Ajouter Chirurgien"
              
            />
          )}
        />

        <Autocomplete
          className="dropdown1"
          multiple
          id="tags-outlined"
          sx={{ width: 400 }}
          options={anesthesistes}
          getOptionLabel={(option) => option.nom +" " +option.prenom}
          // defaultValue={[doctors[1]]}
          onChange={handleChangeMultipleA}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Anistisists"
              placeholder="Ajouter Anesthésiste"
              fullWidth
            />
          )}
        />



        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={coordinateurs}
          getOptionLabel={(option) => option.nom +" " + option.prenom}
          sx={{ width: 400 }}
          onChange={(e, v) => setCorrdinateur(v)}
          renderInput={(params) => <TextField
            {...params} label="Ajouter Coordinateur"/>}
        />






        {/* <div className="dropdown1">
          <p className="reason-p familyFix">Raison de l'examen</p>
          <FormSelect
            aria-label="select type of medical examination"
            onChange={(e) => setVal(e.target.value)}
          >
             <option> Sélectionner </option>
             <option value = "preview"> Aperçu </option>
             <option value="control"> Contrôle </option>
             <option value="operation"> Opération </option>
             <option value="visit"> Visite </option>
          </FormSelect>
        </div> */}
        {/* <div className="dropdown2">
          <p className="patient-p familyFix">Patient</p>
          <FormSelect
            aria-label="select patient"
            onChange={(e) => {
              setPatientId(e.target.value);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Izaberi
            </option> */}
        {/* {patients.map((patient) => {
              return (
                <option key={patient.lbp} value={patient.lbp}>
                  {patient.ime} {patient.prezime}
                </option>
              );
            })} */}
        {/* </FormSelect>
        </div> */}
        <div className="dropdown3">
          <p className="date-p familyFix">date d'operation</p>
          <p>{dateString}</p>
        </div>
      </div>
      <div className="new-appointment-buttons">
        <button
          className="my-close-btn"
          onClick={() => setNewAppointmentVisible(false)}
        >
          Annuler
        </button>
        <button
          className="my-save-btn"
          onClick={() =>
            createNewAppointment(patient, date,salle,typeOp,chirurgienslist,anesthesisteslist,corrdinateur)
          }
        >
          Planifier
        </button>
      </div>
    </div>
  );
};

export default memo(NewAppointment);
