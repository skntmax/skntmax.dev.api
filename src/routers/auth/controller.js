import { user_model } from "../../models/user_model"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { secret_keys } from "../../constans"
import {getUserObj} from './auth_utils'
import { generateUsernames } from "../../utils"
import dotenv from "../../dotenv"

export async function addUser(body) {
   try {
    const { username , email , password}  = body
     let user_exist =await user_model.findOne({ $or: [ {EMAIL:email },  {USERNAME:username } ] 
    
     })
     if(user_exist!=null) {
      // already exist 
      return Promise.reject({error:"user already exist"})  
     }
     
     let hashPass = await bcrypt.hash(password ,  5 )
     let new_user_model  =new user_model( {
        USERNAME:username,
        EMAIL:email,
        PASSWORD:hashPass
     })

     await new_user_model.save()

     let token = jwt.sign({_id:new_user_model._id} , secret_keys.token_secret )
   return Promise.resolve({data:{
      ...getUserObj(new_user_model._doc ,['PASSWORD' ,"_id"] ) ,
     token
   }})
   }catch(err) {
     console.log("err", err)
     return Promise.reject({error:err.message})

   }

}





export async function LoginUser(body) {
   try {
 
    const { username , password }  = body
    let email_or_username = {}
    if(username.includes("@")) {
      // email 
       email_or_username={EMAIL:username}
     }else{
       email_or_username={USERNAME:username}
     }

     let user_exist =await user_model.findOne(email_or_username)
    if(user_exist==null) {
      return Promise.reject({error:"Please Signup first "})  
    }

    let isPasswordTrue =await bcrypt.compare(password ,user_exist.PASSWORD )
    if(isPasswordTrue) {
        let token = jwt.sign({_id:user_exist._id} , secret_keys.token_secret )
        return Promise.resolve({data:{
            ...getUserObj(user_exist._doc ,['PASSWORD' ,"_id"] ) ,
           token
         }})
     }else{
        return Promise.reject({error:"Wrong credentials "})  
     }
   }catch(err) {
    console.log("err", err)
     return Promise.reject({error:err.message})
   }

}










export async function getUserName(username) {
  
   try {
     let usernames = generateUsernames(username )

     let all_users = await (await user_model.find({}, {_id:0 , USERNAME:1})).map(ele=> ele.USERNAME)
    
     let filteredUsers = usernames.filter(ele=> all_users.some(item=> item!=ele)  )
     return Promise.resolve({data:filteredUsers})
   }catch(err) {
    console.log("err", err)
     return Promise.reject({error:err.message})


   }

}






export async function getGoogleAuthenticatedUser(token) {
  
  try {
    let user =jwt.decode(token , dotenv.GOOGLE_CLIENT_ID ) 

    let objPrototype = {
      "USERNAME": user.name ,
      "EMAIL": user.email,
      "USER_TYPE": "normal" ,
      "token": token
    }
     
    return Promise.resolve({data:objPrototype  })
  }catch(err) {
   console.log("err", err)
    return Promise.reject({error:err.message})


  }

}







// async function fn() {
//    try {

//    return Promise.resolve({data:[]})
//    }catch(err) {
//     console.log("err", err)
    //  return Promise.reject({error:err.message})


//    }

// }

