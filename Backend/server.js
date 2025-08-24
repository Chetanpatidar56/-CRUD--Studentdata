const express= require('express');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
const cors=require("cors");



const router=require("./routes/userRoute")
dotenv.config();
const app=express();
app.use(cors());



const PORT=process.env.PORT;
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to Database");
    app.listen(PORT || 4000,(err)=>{
        if(err) console.log(err);
    console.log("listening");
})
})
.catch((error)=>{
    console.log(error);
})
app.use(router);

