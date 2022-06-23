import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getEmployee, updateEmployee } from "../../../redux/actions/employee";
import { ImPencil } from "react-icons/im";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getSidebarLinks } from "../../../commons/sidebarLinks";

const initialState = {
  name: "",
  surname: "",
  jmbg: "",
  address: "",
  city: "",
  profession: "",
  title: "",
  contact: "",
  gender: "male",
  dob: "2000-03-03",
  department: "",
  newPassword: "",
  oldPassword: "",
};

function EditEmployeePage() {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState();
  const [user, setUser] = useState();
  const [editable, setEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const employees = useSelector((state) => state.employees);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUser(loggedUser);
      const roles = loggedUser.roles.split(",");
      if (roles.includes("ROLE_ADMIN")) setLinks(getSidebarLinks("admin", 4));
      else if (roles.includes("ROLE_DR_SPEC_POV"))
        setLinks(getSidebarLinks("doctor", 4));
      else setLinks(getSidebarLinks("nurse", 5));
      dispatch(getEmployee(loggedUser.LBZ));
    } else navigate("/login");
  }, []);

  useEffect(() => {
    if (employees) {
      setEmployee(employees);
      const dateOfBirth = new Date(employees.dob);
      var day = ("0" + dateOfBirth.getDate()).slice(-2);
      var month = ("0" + (dateOfBirth.getMonth() + 1)).slice(-2);
      var today = dateOfBirth.getFullYear() + "-" + month + "-" + day;

      setForm({
        name: employees.name,
        surname: employees.surname,
        jmbg: employees.jmbg,
        address: employees.address,
        city: employees.city,
        profession: employees.profession,
        title: employees.title,
        contact: employees.contact,
        gender: employees.gender,
        dob: today,
        department: employees.department,
        newPassword: "",
        oldPassword: "",
      });
    }
  }, [employees]);

  const departmentsDemo = [
    {
      id: 0,
      name: "Prvo odeljenje",
    },
    {
      id: 1,
      name: "Drugo odeljenje",
    },
    {
      id: 2,
      name: "Trece odeljenje",
    },
  ];

  const privilegesDemo = [
    {
      id: 0,
      name: "Admin",
    },
    {
      id: 1,
      name: "Doktor",
    },
    {
      id: 2,
      name: "Sestra",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeDateHandler = (e) => {
    const date = new Date(e.target.value);
    const years = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "numeric" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    let formatted = years;
    formatted += month.length === 1 ? `-0${month}` : `-${month}`;
    formatted += day.length === 1 ? `-0${day}` : `-${day}`;
    setForm({
      ...form,
      dob: formatted,
    });
  };

  const swapEditable = (e) => {
    e.preventDefault();
    setEditable(!editable);
  };

  const swapPasswordEditable = (e) => {
    e.preventDefault();
    setPasswordEditable(!passwordEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...form,
      department: 1,
      lbz: employee.lbz,
      gender: "male",
    });
    dispatch(
      updateEmployee({
        ...form,
        department: 1,
        lbz: employee.lbz,
        gender: "male",
      })
    );
    const roles = user.roles.split(",");
    if (roles.includes("ROLE_ADMIN")) navigate("/admin");
    else if (roles.includes("ROLE_DR_SPEC_POV")) navigate("/");
    else navigate("/nurse");
  };

  return (
    <div style={{ marginLeft: "15%" }}>
      <div className="sidebar-link-container">
        <Sidebar links={links} />
      </div>
      {employee && (
        <>
          <form onSubmit={handleSubmit} className="form-custom familyFix">
            <h1 className="form-heading">Profil</h1>
            <p className="form-section-heading">
              Podaci{" "}
              <button className="buttonIconBlue" onClick={swapEditable}>
                {editable ? (
                  <>
                    {" "}
                    Pregled podataka <AiOutlineCloseCircle />
                  </>
                ) : (
                  <>
                    {" "}
                    Izmeni <ImPencil />
                  </>
                )}
              </button>
            </p>
            <div className="form-group-custom">
              <input
                className="margin-right"
                placeholder="Ime"
                onChange={handleChange}
                name="name"
                type="text"
                value={form.name}
                disabled={!editable}
              />
              <input
                className="margin-left"
                placeholder="Prezime"
                onChange={handleChange}
                name="surname"
                type="text"
                value={form.surname}
                disabled={!editable}
              />
            </div>
            <div className="form-group-custom">
              <input
                type="date"
                data-date=""
                data-date-format="ddmmyyyy"
                onChange={onChangeDateHandler}
                name="dob"
                className="margin-right"
                value={form.dob}
                disabled={!editable}
              />
              <input
                type="text"
                placeholder="Adresa stanovanja"
                onChange={handleChange}
                name="address"
                className="margin-left margin-right"
                value={form.address}
                disabled={!editable}
              />
              <input
                type="text"
                placeholder="Mesto stanovanja"
                onChange={handleChange}
                name="city"
                className="margin-left"
                value={form.city}
                disabled={!editable}
              />
            </div>
            <div className="form-group-custom">
              <input
                type="text"
                placeholder="Kontakt"
                onChange={handleChange}
                name="contact"
                className="margin-right"
                value={form.contact}
                disabled={!editable}
              />
              <input
                className="margin-left"
                type="text"
                placeholder="JMBG"
                onChange={handleChange}
                name="jmbg"
                value={form.jmbg}
                disabled={!editable}
              />
            </div>
            <div className="form-group-custom">
              <select
                onChange={handleChange}
                className="form-select-custom small-select margin-right"
                aria-label="Default select example"
                name="title"
                value={form.title}
                disabled={!editable}
              >
                <option value="">Titula</option>
                <option value="Prof. dr. med.">Prof. dr. med.</option>
                <option value="Dr med.spec.">Dr med. spec.</option>
                <option value="Dr. sci. med">Dr sci. med.</option>
                <option value="Dipl. farm.">Dipl. farm.</option>
                <option value="Mag. farm.">Mag. farm.</option>
                <option value="Mr">Mr</option>
              </select>
              <select
                onChange={handleChange}
                className="form-select-custom small-select margin-left margin-right"
                aria-label="Default select example"
                name="profession"
                value={form.profession}
                disabled={!editable}
              >
                <option value="">Zanimanje</option>
                <option value="Med. sestra">Med. sestra</option>
                <option value="Spec. biohemicar">Spec. biohemicar</option>
                <option value="Spec. gastroenterolog.">
                  Spec. gastroenterolog
                </option>
                <option value="Spec. ginekolog">Spec. ginekolog</option>
                <option value="Spec. endrokrinolog">Spec. endrokrinolog</option>
                <option value="Spec. kardiolog">Spec. kardiolog</option>
                <option value="Spec. neurolog">Spec. neurolog</option>
                <option value="Spec. nefrolog">Spec. nefrolog</option>
                <option value="Spec. pshijatar">Spec. pshijatar</option>
                <option value="Spec. pulmolog">Spec. pulmolog</option>
                <option value="Spec. urolog">Spec. urolog</option>
                <option value="Spec. hematolog">Spec. hematolog</option>
                <option value="Spec. hirurg">Spec. hirurg</option>
              </select>
              <select
                onChange={handleChange}
                className="form-select-custom small-select margin-left"
                aria-label="Default select example"
                name="department"
                value={form.department}
                disabled={!editable}
              >
                <option value="" disabled>
                  Odeljenje
                </option>
                {departmentsDemo.map((department) => {
                  return (
                    <option key={department.id} value="0">
                      {department.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
          <form onSubmit={handleSubmit} className="form-custom familyFix">
            <p className="form-section-heading">
              Sifra{" "}
              <button className="buttonIconBlue" onClick={swapPasswordEditable}>
                {passwordEditable ? (
                  <>
                    {" "}
                    Pregled podataka <AiOutlineCloseCircle />
                  </>
                ) : (
                  <>
                    {" "}
                    Izmeni <ImPencil />
                  </>
                )}
              </button>
            </p>
            {passwordEditable && (
              <>
                <div className="form-group-custom">
                  <input
                    placeholder="Stara lozinka"
                    onChange={handleChange}
                    name="oldPassword"
                    type="password"
                    value={form.oldPassword}
                  />
                </div>
                <div className="form-group-custom">
                  <input
                    className="margin-right"
                    placeholder="Nova lozinka"
                    onChange={handleChange}
                    name="newPassword"
                    type="password"
                    value={form.newPassword}
                  />
                  <input
                    className="margin-left"
                    placeholder="Nova lozinka ponovo"
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                  />
                </div>
              </>
            )}
            <br></br>
            {(editable || passwordEditable) && (
              <button onClick={handleSubmit}>Izmeni profil</button>
            )}
          </form>
        </>
      )}
    </div>
  );
}
export default EditEmployeePage;
