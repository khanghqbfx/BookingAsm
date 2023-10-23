import './singup.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const SignUp = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
       
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    
    const handleSignUp = async () => {
        if(!username || !password || !fullName || !phoneNumber || !email) {
            setError(true);
        } else {
            setError(false);
        }
        const user = {
            username: username,
            password: password,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
        };
        try {
            await axios.post("/sign-up", user)
                .then((res) => {
                    navigate('/login');
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);	
                });	
        } catch (err) {
            setError(true);
        };
      };

    return (
        <div>
            <div className="main">
                <div className="container">
                    <div className="item">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="item">
                        <input type="text" placeholder="Username" className="input" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="item">
                        <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="item">
                        <input type="text" placeholder="Full Name" className="input" onChange={(e) => setFullName(e.target.value)}/>
                    </div>
                    <div className="item">
                        <input type="tel" placeholder="Phone Number" className="input" onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="item">
                        <input type="email" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="item">
                        <button className="button" onClick={handleSignUp}>Create Account</button>
                    </div>
                    <div className="item">
                        {error && <span className="error">Invalid Credentials!</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;