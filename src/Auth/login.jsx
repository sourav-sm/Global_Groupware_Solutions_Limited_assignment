import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LabelInput({label,placeholder,onChange}){
    return(
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">
                {label}
            </label>
            <input onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" placeholder={placeholder} required/>
        </div>
    )
}

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
        <div className="h-screen flex justify-center flex-col">

           <div className="h-screen flex justify-center flex-col bg-slate-200">
             <div className="flex justify-center">
             <div className="bg-slate-300 p-10 w-full max-w-sm hidden lg:block">
                <div className="px-10 ">
                  <div className="text-3xl font-bold">
                    Welcome Back !
                  </div>
                  <div className="text mt-6">
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas quibusdam illo eum quas nulla beatae iste inventore voluptatibus eos non veniam sed repudiandae nam tempora, molestiae, similique exercitationem expedita facere...
                  </div>
                </div>
     
                </div>
                <div className="bg-white p-10 w-full max-w-sm">
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            USER LOGIN
                        </div>
                    </div>
                    <div className="pt-8">
                        <LabelInput label="Email"  type={"email"} value={email} placeholder="Enter email" onChange={(e) => {
                            setEmail(e.target.value);
                        }}/>
                        
                        <LabelInput label="Password" type={"password"} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>

                        <button onClick={handleLogin} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login In</button>
                        
                        <div className="text-red-600">
                           {error && <p>{error}</p>}
                        </div>
                    </div>
                </div>
             </div>
            </div>     
        </div>
        )     
    };     
     
export default Login;