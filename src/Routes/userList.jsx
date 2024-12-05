import React,{useState,useEffect,useRef} from "react";
import axios from "axios";

const UserList=()=>{
    const [users,setUsers]=useState([]);
    const [filteredUsers,setFilteredUsers]=useState([]);
    const [page,setPage]=useState(1);
    const [totalpage,setTotalpage]=useState(1);
    const [searchQuery,setSearchQuery]=useState("");
    const [editingUser,setEditingUser]=useState(null);
    const [successMessage,setSuccessMessage]=useState("");
    const [errMessage,setErrmessage]=useState("");
    
    const editFormRef=useRef(null);

    useEffect(()=>{
        fetchUsers(page);
    },[page]);

    //user list
    const fetchUsers=async (page)=>{
        try{
            const response=await axios.get(`https://reqres.in/api/users?page=${page}`);
            setUsers(response.data.data);
            setFilteredUsers(response.data.data);
            setTotalpage(response.data.total_pages);
        }catch(error){
            console.error('Error fetching users',error);
        }
    };

    //scroll down to edit form
    const handleEditClick=(user)=>{
        setEditingUser(user);
        setTimeout(() => {
            editFormRef.current?.scrollIntoView({behavior:"smooth",block:'start'});
        }, 100);
    }
    
    //searching user
    const handleSearch=(e)=>{
        const query=e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered=users.filter(user=>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query)||
          (user.email && user.email.toLowerCase().includes(query)) 
        );
        setFilteredUsers(filtered);
    }


    //updating userlist
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`https://reqres.in/api/users/${editingUser.id}`,editingUser);
            //update userlist locally
            const UpdatedUsers=filteredUsers.map((user)=>
             user.id===editingUser.id?{...user,...editingUser}:user
            );
            setFilteredUsers(UpdatedUsers);
            
            setSuccessMessage("User Updated Successfully");
            setEditingUser(null);//close the form
            // fetchUsers(page);//refresh the page (actual api)
        }catch(error){
            setErrmessage("Error updating User!");
            console.log(error);
        }
    };
     
    //delteing user from userlist
    const handleDelete=async (id)=>{
        try{
            await axios.delete(`https://reqres.in/api/users/${id}`);
            //update the userlist locally
            const filterUsers=users.filter((user)=>user.id!==id);
            setFilteredUsers(filterUsers);

            setSuccessMessage("User Deleted SuccessFully!");
            // fetchUsers(page);//refresh the page (actual api)
        }catch(error){
            setErrmessage("Error Deleting User!");
            console.log(error);
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setEditingUser({...editingUser,[name]:value});
    }

    const nextPage=()=>{
        if(page<totalpage) setPage(page+1);
    };

    const prevPage=()=>{
        if(page>1) setPage(page-1);
    }

    return(
        <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Users List</h1>
             {successMessage && <div className="text-green-500 mb-4 text-lg font-semibold">{successMessage}</div>}
             {errMessage && <div className="text-red-500 mb-4 text-lg font-semibold">{errMessage}</div>}
            
            <input
               type="text" placeholder="Search Users....."
               value={searchQuery} onChange={handleSearch}
               className="w-full mb-6 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredUsers.length>0 ?( 
                    filteredUsers.map(user=>(
                    <div 
                       key={user.id}
                       className="bg-white shadow-sm rounded-lg p-4 flex flex-col items-center transition-transform hover:scale-105"
                    >
                        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-24 h-24 rounded-full mb-4 object-cover"/>
                        <div className="flex space-x-2 text-lg font-semibold text-gray-800">
                            <p>{user.first_name}</p>
                            <p>{user.last_name}</p>
                         </div>   

                        <div className="flex mt-4 space-x-2">
                            <button onClick={() => {
                               setEditingUser(user);
                               handleEditClick(user);
                            }} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                              Delete
                            </button>
                        </div>
                    </div>        
                ))
            ):(
                <p className="text-center text-gray-500 col-span-full">No Users found</p>
            )}
            </div>
            <div className="flex justify-between mt-8">
                <button onClick={prevPage} disabled={page===1} type="button" className={`px-4 py-2 rounded ${page===1 ? 'bg-gray-300 cursor-not-allowed':'bg-blue-600 hover:bg-blue-700 text-white'}`}>Previous</button>
                <button onClick={nextPage} disabled={page===totalpage} type="button" className={`px-4 py-2 rounded ${page===totalpage ?'bg-gray-300 cursor-not-allowed':'bg-blue-600 hover:bg-blue-700 text-white'}`}>Next</button>
            </div>

            {/* Edit Form */}
            {editingUser &&(
                <form ref={editFormRef} onSubmit={handleUpdate} className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-4 flex justify-center text-orange-700">Edit User</h2>
                    <div className="flex flex-wrap justify-center sm:justify-around gap-4">
                       <input 
                          type="text" name="first_name" value={editingUser.first_name}
                          onChange={handleChange} placeholder="First Name" className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 text-sm rounded-lg w-64 p-2.5"
                       />
                       <input 
                          type="text" name="last_name" value={editingUser.last_name}
                          onChange={handleChange} placeholder="Last Name" className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 text-sm rounded-lg w-64 p-2.5"
                       />
                       <input 
                          type="text" name="email" value={editingUser.email || ""}
                          onChange={handleChange} placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 text-sm rounded-lg w-64 p-2.5"
                       />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Update User</button>
                        <button type="button" onClick={()=>editingUser(null)} className="ml-4 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            )}
              
        </div>
    ) 
    
}
export default UserList;

