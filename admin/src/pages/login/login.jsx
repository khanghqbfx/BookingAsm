import './login.css'
import { useState , useEffect } from 'react';
import axios from '../../utils/axios'
import {useNavigate} from 'react-router-dom';


const  Login = ({admin} ,setAdmin) => {
    const [username , setUsername] = useState(null);
    const [password  , setPassword] = useState(null);
    const [error ,setError] = useState(false);

    const navigate = useNavigate()

    useEffect(()=> {
        if(admin) {
            navigate('/dashboard')
        }
    }, [admin , navigate])

    const hanlerLogin =() => {
        const  user = {
            username : username , 
            password : password,
        };



        axios.post('/admin/login' , user)
        .then((res) => {
            localStorage.setItem('admin'  , JSON.stringify(res.data));
            setAdmin(res.data)
            navigate('/dashboard')
        })
        .catch((error) =>{
            setError(true)
            console.log(error)
        })


    }

    return(
        <div  className='login'>
            <div className='container'>
                <h1 className='login-title'>Login</h1>
                <div className='item'>
                    <input type='text' placeholder='UserName' id='username' onChange={(e) => setUsername(e.target.value)}  className='input'/>
                </div>
                <div className='item'>
                    <input type='password' placeholder='password'  id='password' onChange={(e) => setPassword(e.target.value)} className='input' />
                </div>
                
                <div className='item'>
                    <button className='button'onClick={hanlerLogin}>Login</button>

                </div>
                <div className='item'>
                    {error && <span className='error'>Wrong Credentials!</span>}
                </div>

            </div>
            
        </div>
    )
}

export default Login