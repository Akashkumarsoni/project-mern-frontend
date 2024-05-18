import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"
import axios from "axios";
import useAuth from '../../context/auth/useAuth.js';
import BASE_URL from '../../utils/urlConfig.js';

function Login() {
    /*****data for you backend***/
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const { setAuth } = useAuth();
    const handleSubmit = async () => {
       // write your logic here

          try{
            setLoading(true);
            let userDetails= {
               email,
               password,
            };
            const resp = await axios.post(`${BASE_URL}/api/auth/login`, userDetails);
            const data = resp.data;
            if(data.status === "success") {
                sessionStorage.setItem("loggedIn","true");
                sessionStorage.setItem("email",email);

                const checkFromCart= sessionStorage.getItem("checkout");
                setEmail("");
                setPassword("");
                setAuth(data);
                if(checkFromCart == "true") {
                    navigate('/cart');
                }else{
                    navigate('/');
                }
                
            }
        }catch(err){
            console.log(err.message);
            setErrMsg("User is not loggedin successfully!");
            setTimeout(()=>{
                setErrMsg("");
            }, 2000);
        } finally {
            setLoading(false);
        }
    }
    /**
     * email, password -> verified
     * protected Routes : profile , orders , -> need your verification -> JWT 
     * 
     * **/
    if (loading) return <h1>Loading.....</h1>
    return (
        <div className="signinscreen">
            <div className="container">
                <div className="innerContainer">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px',
                            fontSize: '28px',
                            // backgroundColor: 'red',
                        }}
                    >
                        <div style={{ cursor: 'pointer' }} onClick={() => { }}>
                            <i className="fas fa-arrow-circle-left fa-5x"></i>
                        </div>
                        <p>Sign In</p>
                    </div>

                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="lname"
                        name="email"
                        placeholder="Your email.."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="lname"
                        name="password"
                        placeholder="Your Password.."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Link to="/signup" className="link">
                        <span>Create a new account ?</span>
                    </Link>
                    <br />
                    <input type="submit" value="Sign in" onClick={handleSubmit} />
                    <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
                </div>
            </div>
        </div>
    )
}

export default Login