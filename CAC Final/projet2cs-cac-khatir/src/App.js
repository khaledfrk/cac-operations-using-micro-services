import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminHomePage/AdminHomePage";
import ForgotPasswordPage from "./pages/General/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "./pages/General/LoginPage/LoginPage";
import { createTheme, ThemeProvider } from "@mui/material";
import StatisiquePage from "./pages/admin/StatistiquePage/StatisiquePage";
import Stock from "./pages/admin/Stock/stock";
import AddEmployeePage from "./pages/admin/AddEmployeePage/AddEmployeePage";
import ListEmployeePage from "./pages/admin/ListEmployeesPage/ListEmployeePage";
import AddProductPage from "./pages/admin/AddProductPage/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage/EditProductPage";
// import DoctorHomepage from "./pages/admin/DoctorHomepage/DoctorHomepage"
import AnesthesisteHomePage from "./pages/anesthesiste/AnesthesisteHomePage/AnesthesisteHomePage";
import ChirurgienHomePage from "./pages/chirurgien/ChirurgienHomePage/ChirurgienHomePage";
import AnesthesisteFormPage from "./pages/anesthesiste/AnesthesisteForms/AnesthesisteFormPage";
import EditFormChirurgien from "./pages/chirurgien/EditFormChirurgien/EditFormChirurgien";
import ChirurgienFormPage from "./pages/chirurgien/ChirurgienForm/ChirurgienFormPage";
import CoordianteurHomePage from "./pages/coordinator/CoordinateurHomePage/CoordianteurHomePage";
import CoordinateurFormAvantPage from "./pages/coordinator/CoordinateurFormavant/CoordinateurFormAvantPage";
import CoordinateurFormApresPage from "./pages/coordinator/CoordinateurFormapres/CoordinateurFormApresPage";
import OperationDetailsPage from "./pages/admin/OperationDetailsPage/OperationDetailsPage";
import OperationArchive from "./pages/admin/operationsArchive/OperationArchive";



const theme = createTheme({
  palette: {
    primary: {
      main: '#51E1DA',
    },
  },
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        {/* GENERAL */}
         <Route path="/login" exact element={<LoginPage />} />
        {/* <Route path="/forgot-password" exact element={<ForgotPasswordPage />} /> */} 
        
        {/* ADMIN */}
       <Route path="/" exact element={<ListEmployeePage />} />
       <Route path="/admin" exact element={<AdminHomePage />} />
       <Route path="/admin/statistique"  element={<StatisiquePage />} />
       <Route path="/admin/stock"  element={<Stock />} />
       <Route path="/admin/addEmployee"  element={<AddEmployeePage />} />
       <Route path="/admin/addProduct"  element={<AddProductPage />} />
       <Route path="/admin/EditProduct/:productId"  element={<EditProductPage />} />
       <Route path="/doctor" exact element={<ChirurgienHomePage />} />
       <Route path="/doctor/form/:id" exact element={<ChirurgienFormPage />} />
       <Route path="/doctor/Editform/:id" exact element={<EditFormChirurgien />} />
       <Route path="/anesth/form/:id"  element={<AnesthesisteFormPage />} />
       <Route path="/anesth/"  element={<AnesthesisteHomePage/>} />
       <Route path="/coordinateur/"  element={<CoordianteurHomePage />} />
       <Route path="/coordinateur/operationav/:id"  element={<CoordinateurFormAvantPage />} />
       <Route path="/coordinateur/operationap/:id"  element={<CoordinateurFormApresPage />} />
       <Route path="/admin/operations"  element={<OperationArchive />} />
       <Route path="/admin/operations/details/:id" element={<OperationDetailsPage />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

