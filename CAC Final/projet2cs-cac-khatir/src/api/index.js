import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9191/" ,headers:{
  'Access-Control-Allow-Origin': '*',
 'Access-Control-Allow-Headers': '*',
'Content-Type':'application/json'}});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    req.headers.common["Content-Type"] = "application/json;charset=UTF-8";
    req["headers"]["common"]["Accept"] = "application/json";
  }
  return req;
});



// PRODUCTS

export const fetchProducts = () =>
  API.get(`service-stock/stock/product/all`);
export const fetchProduct = (productId) =>
  API.get(`service-stock/stock/product/${productId}`);
export const createProduct = (formData) =>
API.post(`service-stock/stock/product/`, formData);
export const updteProduct = (formData,productId) =>{
  API.put(`service-stock/stock/product/update/${productId}`, formData);
}
export const deletProduct = (productId) =>
  API.delete(`service-stock/stock/product/delete/${productId}`);
// export const searchPatients = (searchValues) =>
//   API.post("/patients", searchValues);


//LOGIN
export const login = (formData) =>
  API.post("/service-auth/authenticate", formData);


//EMPLOYEE
  export const fetchEmployees = () =>
  API.post(`service-operation/rsu/chirugien/all`, {
    department: 1,
  });

  export const fetchEmployeesAll = () =>
  API.get(`service-operation/rsu/personnel/all/`, {
    department: 1,
  });
  export const createEmploye = (formData) =>
  API.post(`service-auth/register`, formData);




//PATIENTS
  export const fetchPatients = () =>
  API.get(`service-operation/rsu/patient/all`, {});

  
  


//CHIRUGIEN

export const fetchChirugiens = () =>API.get(`service-operation/rsu/chirurgien/all`, {});

//Anesthesistes

export const fetchAnesthesistes = () =>API.get(`service-operation/rsu/anesthesiste/all`, {});


export const fetchCoordinateurs = () =>API.get(`service-operation/rsu/coordinateur/all`, {});


export const fetchSalles = () => API.get(`service-operation/rsu/salle/all`, {});


//OREPARTIONS

export const creatOperation = (formData) =>
  API.post(`service-operation/rsu/insertOperation`, formData);

export const createDetailOperations = (formData,path) =>
  API.post(`service-operation/rsu/insertDetails/${path}`, formData);

export const createDetailOperationAnesths = (formData,path) =>
  API.post(`service-operation/rsu/insertDetailsAnesthesie/${path}`, formData);
  
export const createDetailOperationCoors = (formData,path) =>
  API.post(`service-operation/rsu/insertDetailsDurant/${path}`, formData);
export const createDetailOperationCoordinateurform2 = (formData,path) =>
  API.post(`service-operation/rsu/insertDetailsApres/${path}`, formData);


  export const fetchOperations = (formData) =>
  API.get(`service-operation/rsu/operation/all`, formData);

  export const fetchOperationsById = (id) =>
  API.get(`service-operation/rsu/operation/${id}`, {});

  export const getOperationsByUserNames = (username) =>
  API.get(`service-operation/rsu/operations/${username}`,{} );

//STAT
export const getStatDoc = () => API.get(`service-operation/rsu/something`, {});