function rgmcat_m(body) {

    return {
         TITLE:body.title ,
         DISC:body.disc ,
         IMAGE:body.img || "" ,
    }
    
}

export {rgmcat_m}