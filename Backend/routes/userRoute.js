const express= require('express');
const mongoose=require('mongoose');

const User=require("../models/UserModel");
 const router=express.Router();
router.post('/',async(req,res)=>{
    const{name,email,age}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({error:"email already present"});
        }
       
        const useradded= await User.create({
        name:name,
        email:email,
        age:age,
    })
    res.status(201).json(useradded);

    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    

})

router.get('/',async(req,res)=>{
    try{
         const showall= await User.find();
         res.status(200).json(showall);

    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
   
})

router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    try{ const singleuser=await User.findById({_id:id});
    res.status(200).json(singleuser);
        
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
  
})
router.delete('/:id',async(req,res)=>{
    try{
         const {id}=req.params;
    const remove=await User.findByIdAndDelete({_id:id});
    res.json(remove);

    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
 
})
router.patch('/:id',async(req,res)=>{
   try{
     const {id}=req.params;
    const{name,email,age}=req.body;
    const updateuser=await User.findByIdAndUpdate(id,req.body,{
        new:true,
    });
    res.status(200).json(updateuser);
   }catch(error){
    console.log(error);
    res.status(401).json({error:error.message});
   }
})

module.exports=router;