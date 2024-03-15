
 function getUserObj(obj , skip_key ) { 
    let res ={}
 
    for(let key in obj) {
       
        if(!skip_key.includes(key)) {
            res[key] = obj[key]
        }
       
    }
       
    return res
 }

 export {getUserObj}