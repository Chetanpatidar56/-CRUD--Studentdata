import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';




const Update = () => {
   const[name,setname]=useState("");
      const[email,setemail]=useState("");
      const[age,setage]=useState();
      const[error,seterror]=useState("");
      const[success,setSuccess]=useState("");
      const {id}=useParams();
      const navigate=useNavigate();

      const getsingleuser=async()=>{
        const response=await fetch(`http://localhost:4000/${id}`);
        const result=await response.json();

        if(!response.ok)
        {
          console.log(result.error);
          seterror(result.error);
        }
        if(response.ok)
        {
          seterror("");
          console.log(result);
          setname(result.name);
          setemail(result.email);
          setage(result.age);
        }
        

      };
      useEffect(()=>{
        getsingleuser();
      },[])
      const handleupdate=async(e)=>{
        e.preventDefault();
        const updateuser={name,email,age};
        const response=await fetch(`http://localhost:4000/${id}`,{
          method:"PATCH",
          body:JSON.stringify(updateuser),
          headers:{
            "Content-Type":"application/json",
          },
        })

        const result=await response.json();
        if(!response.ok){
          console.log(result.error);
          seterror(result.error);
        }
        if(response.ok)
        {
          seterror("");
          setSuccess("Data Edited Successfully");
          setTimeout(()=>{
            setSuccess("");
             navigate("/all");
          },1000)
         
        }

      }
  return (
     <div className='container my-2'>
          {error && <div className='alert alert-danger'>{error}</div>}
           {success && <div className='alert alert-success'>{success}</div>}
   


        <h2 className='text-center'>Edit the data</h2>
        <form onSubmit={handleupdate}>
       

              <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>setname(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setemail(e.target.value)}/>
   
  </div>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=>setage(e.target.value)}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </div>
  )
}

export default Update
