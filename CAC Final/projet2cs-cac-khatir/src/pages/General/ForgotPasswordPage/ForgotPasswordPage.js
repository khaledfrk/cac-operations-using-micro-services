import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { resetPassword } from "../../../api";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // resetPassword(email);
    navigate("/login");
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1 className="form-heading">Reset Password</h1>
            <br></br>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleSubmit}>Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgotPasswordPage;
