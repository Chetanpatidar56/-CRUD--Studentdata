import React, { useState } from 'react'

const Create = () => {
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[age,setage]=useState();
    const[error,seterror]=useState("");
    const[success,setSuccess]=useState("");
    console.log(name,email,age);
    const handlesubmit=async(e)=>{
        e.preventDefault();
        seterror("");
        setSuccess("");
        
        const addUser={name,email,age}
        const response=await fetch("http://localhost:4000",{
            method:"POST",
            body:JSON.stringify(addUser),
            headers:{
                "Content-Type":"application/json",
            },
        })
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
            seterror(result.error);
            setSuccess("");
        }
        if(response.ok){
            console.log(result);
            setSuccess("Info Saved Successfully");
            setTimeout(()=>{
              setSuccess("");

            },2000)
            
            seterror("");
            setname("");
            setemail("");
            setage("");
        }
    }
  return (
    <div className='container my-2'>
          {error && <div className='alert alert-danger'>{error}</div>}
           {success && <div className='alert alert-success'>{success}</div>}
   


        <h2 className='text-center'>Enter the data</h2>
        <form onSubmit={handlesubmit}>
       

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

export default Create
