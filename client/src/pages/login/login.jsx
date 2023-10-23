import './login.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const Login = ({setUser}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    
    const handleLogin = async () => {
        const user = {
            username: username,
            password: password
        };
        try {
            await axios.post("/login", user)
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data))
                setUser(res.data)
                navigate('/');
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
                        <h1>Login</h1>
                    </div>
                    <div className="item">
                        <input type="text" placeholder="Username" className="input" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="item">
                        <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="item">
                        <button className="button" onClick={handleLogin}>Login</button>
                    </div>
                    <div className="item">
                        {error && <span className="error">Wrong Credentials!</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;