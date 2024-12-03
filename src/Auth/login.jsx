import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();
    
    const handleLogin=async (e)=>{
         e.preventDefault();
        try{
            const response=await axios.post('https://reqres.in/api/login',{
                email,
                password
            });
            localStorage.setItem('token',response.data.token);
            navigate('/users');
        }catch(err){
            setError('Invalid login credentials');
        }
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
};

export default Login;