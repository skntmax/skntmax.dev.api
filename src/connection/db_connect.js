import mongoose from 'mongoose';
import dotenv from '../dotenv';


export async function initDb(){
     
    mongoose.connect(dotenv.DB_URL ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     }).then(res=>{
            console.log(" connected to db " )
     }).catch(err=>{
         console.log("some error occured " , err )
     }).finally(()=>{
         console.log("connection attempt succesfull ")
     })
      
     return
      
} 