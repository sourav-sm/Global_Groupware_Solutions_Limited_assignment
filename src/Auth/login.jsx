import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { LuEye,LuEyeOff } from "react-icons/lu";


function LabelInput({label,placeholder,onChange,type,showPassword,togglePassword}){
    return(
        <div className="relative">
            <label className="block mb-2 text-sm text-black font-semibold pt-4">
                {label}
            </label>
            <div>
                <input onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" 
                type={type}
                placeholder={placeholder} 
                required/>
                {label==="Password" && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mb-7" onClick={togglePassword}>
                        {showPassword?<LuEyeOff size={20}/>:<LuEye size={20}/>}
                    </div>
                )}
            </div>
            
        </div>
    )
}

const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [showPassword,setshowPassword]=useState(false);
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
        
                        <LabelInput label="Password" type={showPassword?"text":"Password"} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}
                        showPassword={showPassword}
                        togglePassword={()=>setshowPassword(!showPassword)}    
                            />

                        <button onClick={handleLogin} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
                        
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