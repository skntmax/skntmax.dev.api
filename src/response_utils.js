const SuccessStatus=(response , messaage="success")=> {
    
    return {
         status : true , 
         result:response,
         code:200,
         message:messaage
    }

}

const FailureStatus=(response=null , messaage="failed")=> {
    
    
    return {
         status : false , 
         result:response,
         code:500,
         message:messaage
    }

}


export {SuccessStatus , FailureStatus}