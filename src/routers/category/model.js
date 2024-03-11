function rgmcat_m(body) {
  //  title ,  disc , multi , sub_cat ,   img(FILE_TYPE)   ,  originalFileName(dynamic)
  return {
    TITLE: body.title,
    DISC: body.disc,
    IMAGE: body.img || "",
    MULTI:body.multi || false ,
    SUB_CAT:body.sub_cat.split('=='),  
    ORIGINAL_FILE_NAME: body.originalFileName,
  };
}

export { rgmcat_m };
