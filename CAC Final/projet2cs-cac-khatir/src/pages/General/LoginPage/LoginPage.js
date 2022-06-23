import "./styles.css";
import LoginBolinca from "./LoginBolnica.jpg";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { login } from "../../../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/auth";
import logo from '../../../assets/CAC dark.png';

const initialState = {
  email: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form, navigate));
  };
  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <div className="form-login">
          <form action="#" onSubmit={handleSubmit} >
            <h1 className="form-heading"><img src={logo} width="150px" alt="logo"/></h1>
            <br></br>
            <input
              className="form-input-custom"
              name="username"
              type="username"
              placeholder="Nom de l'utilisateur"
              onChange={handleChange}
              required
            />
            <input
              className="form-input-custom"
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={handleChange}
              required
            />
            <br></br>
            <button 
             type="submit"
            // onClick={handleSubmit} 
            className="submit-buttona">connecter</button>
            {/* <Link to="/forgot-password" style={{ marginTop: "20px" }}>
              forget password ?
            </Link> */}
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
export default LoginPage;
