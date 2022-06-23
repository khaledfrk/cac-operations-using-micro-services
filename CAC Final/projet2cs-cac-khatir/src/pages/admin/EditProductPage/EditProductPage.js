import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getProduct, updateProduct} from "../../../redux/actions/products";
import { logout } from '../../../redux/actions/auth';
import turnoff from '../../../assets/turnOff.png'  


const initialState = {
    nomP: "",
    qntP: "",
    typeP: "",
    prixP: "",
    nlot: "",
    delai: "",
    datePeremption: "2023-12-03",
    categorie: ""
};

function EditProductPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [productId, setProductId] = useState();
    const navigate = useNavigate();
    const product = useSelector((state) => state.productReducer);
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        const pathParts = location.pathname.split("/");
        setProductId(pathParts[pathParts.length - 1]);
        dispatch(getProduct(pathParts[pathParts.length - 1]));
    }, []);

    useEffect(() => {
        if (product.length !== 0) {
            const dateOfBirth = new Date(product.datePeremption);
            var day = ("0" + dateOfBirth.getDate()).slice(-2);
            var month = ("0" + (dateOfBirth.getMonth() + 1)).slice(-2);
            var today = dateOfBirth.getFullYear() + "-" + month + "-" + day;

            setForm({
                nomP: product.nomP,
                qntP: product.qntP,
                typeP: product.typeP,
                prixP: product.prixP,
                nlot: product.nlot,
                delai: product.delai,
                datePeremption:today,
                categorie: product.categorie,
            });
        }
    }, [product]);

     


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
            datePeremption: formatted,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(form,productId));
        navigate("/admin/stock");
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
        <div className="page-container">
            {/* <div className="sidebar-link-container"> */}
                <Sidebar links={getSidebarLinks("admin", 4)} />
            {/* </div> */}
            <div className="others">

            {product && (
                <div>
                <h1 className="form-heading">Edit Produit</h1>
                <br></br>
                <div className='form-form'>
                <form onSubmit={handleSubmit} className="form-custom familyFix">
                    
                    <div className="form-group-custom">
                        <input
                            className="margin-left form-input-customs"
                            placeholder="nom Produit"
                            onChange={handleChange}
                            name="nomP"
                            type="text"
                            value={form.nomP}
                            required
                        />
                        <input
                            className="margin-left margin-right form-input-customs"
                            placeholder="quantite"
                            onChange={handleChange}
                            name="qntP"
                            type="number"
                            value={form.qntP}
                            required
                        />
                        <input
                            type="date"
                            data-date=""
                            data-date-format="ddmmyyyy"
                            onChange={onChangeDateHandler}
                            name="DatePeremption"
                            className="margin-left form-input-customs"
                            value={form.datePeremption}
                            required
                        />
                    </div>
                    <div className="form-group-custom">
                        <input
                            type="text"
                            placeholder="typeP"
                            onChange={handleChange}
                            name="typeP"
                            value={form.typeP}
                            className="margin-left form-input-customs"
                            required
                        />
                        <input
                            type="text"
                            placeholder="nlot"
                            onChange={handleChange}
                            value={form.nlot}
                            name="nlot"
                            required
                            className="margin-left form-input-customs"
                        />
                        <input
                            className="margin-left form-input-customs"
                            type="number"
                            placeholder="delai"
                            value={form.delai}
                            onChange={handleChange}
                            name="delai"
                            required
                        />
                    </div>
                    <div className="form-group-custom">
                        <input
                            type="text"
                            placeholder="categorie"
                            onChange={handleChange}
                            value={form.categorie}
                            name="categorie"
                            className="margin-left form-input-customs"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Prix"
                            onChange={handleChange}
                            value={form.prixP}
                            name="prixP"
                            className="margin-left form-input-customs"
                            required
                        />


                    </div>
                    <br></br>
                    <button class="submit-buttona">Edit Produit</button>
                </form>
                </div>
                </div>
            )}
            </div>
        </div>
        
        </div>
    );
}
export default EditProductPage;
