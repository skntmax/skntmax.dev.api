function rgmcat_m(body) {

    return {
         TITLE:body.title ,
         DISC:body.disc ,
         IMAGE:body.img || "" ,
         ORIGINAL_FILE_NAME:body.originalFileName 
    }
    
}

export {rgmcat_m}