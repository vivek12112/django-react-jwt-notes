import { useState } from "react";
 import api from "../api.js"; // Corrected import path
 import { useNavigate, Link } from "react-router-dom";
 import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js"; // Corrected import path
 import "../styles/Form.css"; // Corrected import path
 import LoadingIndicator from "./LoadingIndicator.jsx"; // Corrected import path

 function Form({ route, method }) {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const name = method === "login" ? "Login" : "Register";

     const handleSubmit = async (e) => {
         setLoading(true);
         e.preventDefault();

         try {
             const res = await api.post(route, { username, password })
             if (method === "login") {
                 localStorage.setItem(ACCESS_TOKEN, res.data.access);
                 localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                 navigate("/")
             } else {
                 navigate("/login")
             }
         } catch (error) {
             alert(error)
         } finally {
             setLoading(false)
         }
     };

     return (
         <form onSubmit={handleSubmit} className="form-container">
             <h1>{name}</h1>
             <input
                 className="form-input"
                 type="text"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 placeholder="Username"
                 required
             />
             <input
                 className="form-input"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password"
                 required
             />
             {loading && <LoadingIndicator />}
             <button className="form-button" type="submit">
                 {name}
             </button>
             {method === "login" ? (
                 <p className="mt-4 text-center text-sm text-gray-600">
                     Don't have an account?{' '}
                     <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                         Register here
                     </Link>
                 </p>
             ) : (
                  <p className="mt-4 text-center text-sm text-gray-600">
                     Already have an account?{' '}
                     <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                         Login here
                     </Link>
                 </p>
             )}
         </form>
     );
 }

 export default Form
