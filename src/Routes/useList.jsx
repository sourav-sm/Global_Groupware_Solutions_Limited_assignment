import React,{useState,useEffect} from "react";
import axios from "axios";

const UserList=()=>{
    const [users,setUsers]=useState([]);
    const [page,setPage]=useState(1);
    const [totalpage,setTotalpage]=useState(1);

    useEffect(()=>{
        fetchUsers(page);
    },[page]);

    const fetchUsers=async (page)=>{
        try{
            const response=await axios.get(`https://reqres.in/api/users?page=${page}`);
            setUsers(response.data.data);
            setTotalpage(response.data.total_pages);
        }catch(error){
            console.error('Error fetching users',error);
        }
    };

    const nextPage=()=>{
        if(page<totalpage) setPage(page+1);
    };

    const prevPage=()=>{
        if(page>1) setPage(page-1);
    }

    return(
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">User List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {users.map(user=>(
                    <div 
                       key={user.id}
                       className="bg-white shadow-sm rounded-lg p-4 flex flex-col items-center transition-transform hover:scale-105"
                    >
                        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-24 h-24 rounded-full mb-4 object-cover"/>
                        <p className="text-lg font-semibold text-gray-800">{user.first_name}{user.last_name}</p>
                    </div>        
                ))}
            </div>
            <div className="flex justify-between mt-8">
                <button onClick={prevPage} disabled={page===1} type="button" className={`px-4 py-2 rounded ${page===1 ? 'bg-gray-300 cursor-not-allowed':'bg-blue-600 hover:bg-blue-700 text-white'}`}>Previous</button>
                <button onClick={nextPage} disabled={page===totalpage} type="button" className={`px-4 py-2 rounded ${page===totalpage ?'bg-gray-300 cursor-not-allowed':'bg-blue-600 hover:bg-blue-700 text-white'}`}>Next</button>
            </div>
              
        </div>
    ) 
    
}
export default UserList