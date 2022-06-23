import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getProduct } from "../../../redux/actions/products";
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  


const initialState = {
    name: "",
    surname: "",
    jmbg: "",
    email: "",
    address: "",
    city: "",
    profession: "",
    title: "",
    contact: "",
    gender: "male",
    dob: "2000-03-03",
    department: "",
    //   username: "",
    newPassword: "",
    oldPassword: "",
    //   privilege: "",
  };
  
  function EditEmployeePage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [lbz, setLbz] = useState();
    const navigate = useNavigate();
    const employee = useSelector((state) => state.employeeReducer);
    const [form, setForm] = useState(initialState);
  
    useEffect(() => {
      const pathParts = location.pathname.split("/");
      setLbz(pathParts[pathParts.length - 1]);
      dispatch(getProduct(pathParts[pathParts.length - 1]));
    }, []);
  
    useEffect(() => {
      if (employee.length !== 0) {
        const dateOfBirth = new Date(employee.dob);
        var day = ("0" + dateOfBirth.getDate()).slice(-2);
        var month = ("0" + (dateOfBirth.getMonth() + 1)).slice(-2);
        var today = dateOfBirth.getFullYear() + "-" + month + "-" + day;
  
        setForm({
          name: employee.name,
          surname: employee.surname,
          jmbg: employee.jmbg,
          email: employee.email,
          address: employee.address,
          city: employee.city,
          profession: employee.profession,
          title: employee.title,
          contact: employee.contact,
          gender: "male",
          dob: today,
          department: employee.department,
          newPassword: "",
          oldPassword: "",
        });
      }
    }, [employee]);
  

  
    const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });
  
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
        // updateEmployee({
        //   ...form,
        //   department: 1,
        //   newPassword: "",
        //   oldPassword: "",
        //   lbz,
        // })
      );
      navigate("/admin/employee-preview");
    };
    const logoutUser = () => {
      dispatch(logout(navigate));
    };
    return (
      <div>
      <div className='username-container'>
        {/* <div className='username'>{admin.sub} |</div> */}
        <div className='logout'><button onClick={logoutUser} class="button-turnoff"><img src={turnoff} width="30px" height="30px" alt="logo" className='button-img'/></button></div>
      </div>
      <div style={{ marginLeft: "15%" }}>
        <div className="sidebar-link-container">
          <Sidebar links={getSidebarLinks("admin", 0)} />
        </div>
        {employee && (
          <form onSubmit={handleSubmit} className="form-custom familyFix">
            <h1 className="form-heading">Izmena zaposlenog</h1>
            <br></br>
            <div className="form-group-custom">
              <input
                className="margin-right"
                placeholder="Ime"
                onChange={handleChange}
                name="name"
                type="text"
                value={form.name}
              />
              <input
                className="margin-left"
                placeholder="Prezime"
                onChange={handleChange}
                name="surname"
                type="text"
                value={form.surname}
              />
            </div>
            <div className="form-group-custom">
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={form.email}
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
              />
              <input
                type="text"
                placeholder="Adresa stanovanja"
                onChange={handleChange}
                name="address"
                className="margin-left margin-right"
                value={form.address}
              />
              <input
                type="text"
                placeholder="Mesto stanovanja"
                onChange={handleChange}
                name="city"
                className="margin-left"
                value={form.city}
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
              />
              <input
                className="margin-left"
                type="text"
                placeholder="JMBG"
                onChange={handleChange}
                name="jmbg"
                value={form.jmbg}
              />
            </div>
            <div className="form-group-custom">
              <select
                onChange={handleChange}
                className="form-select-custom small-select margin-right"
                aria-label="Default select example"
                name="title"
                value={form.title}
              >
                <option value="">Titula</option>
                <option value="Prof. dr. med.">Prof. dr. med.</option>
                <option value="Dr med. spec.">Dr med. spec.</option>
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
              {/* <select
                onChange={handleChange}
                className="form-select-custom small-select margin-left"
                aria-label="Default select example"
                name="department"
                value={form.department}
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
              </select> */}
            </div>
            <div className="form-group-custom">
              <div className="wrapper">
                <input
                  type="radio"
                  name="gender"
                  id="option-1"
                  value="male"
                  onChange={handleChange}
                  checked
                />
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="option-2"
                  onChange={handleChange}
                />
                <label htmlFor="option-1" className="option option-1">
                  <div className="dot"></div>
                  <span>Muski pol</span>
                </label>
                <label htmlFor="option-2" className="option option-2">
                  <div className="dot"></div>
                  <span>Zenski pol</span>
                </label>
              </div>
            </div>
            <br></br>
            <button onClick={handleSubmit}>Izmeni zaposlenog</button>
          </form>
        )}
      </div>
      </div>
    );
  }
  export default EditEmployeePage;
  