import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const Allpost = () => {
  const[data,setdata]=useState([]);
  const[error,seterror]=useState("");
  const[success,setSuccess]=useState("");
  async function getdata() {
    const response=await fetch("http://localhost:4000");
    const result=await response.json();
    if(!response.ok){
      console.log(result.error);
      seterror(result.error);
    }
    if(response.ok){
      setdata(result);
    }
}

useEffect(()=>{
  getdata();

},[])
const handledelete=async(id)=>{
  const response=await fetch(`http://localhost:4000/${id}`,{
    method:"DELETE"
  });
  const result=await response.json();
  if(!response.ok)
  {
   seterror(result.error);
  }
  if(response.ok)
  {
    setSuccess("data deleted successfully");
    setTimeout(()=>{
      setSuccess("");

        getdata();

    },1000)
  
  }

};
console.log(data);
  return (
    <div className='container my-2'>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className='alert alert-success'>{success}</div>}

      <h2 className='text-center'>All data</h2>
      <div className='row'>
        {Array.isArray(data) && data.map((ele)=>(
          <div key={ele._id} className='col-3'>
          <div className="card">
  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
    <p className="card-text">{ele.age}</p>
    <Link to={`/${ele._id}`} className="card-link" style={{cursor:"pointer"}}>Edit</Link>
    <a className="card-link"style={{cursor:"pointer"}} onClick={()=>handledelete(ele._id)}>Delete</a>
  </div>
</div>
</div>

        ))}
        
        

      </div>
      
    </div>
  )
}

export default Allpost
