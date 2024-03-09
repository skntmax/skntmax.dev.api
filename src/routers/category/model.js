function rgmcat_m(body) {
  //  title ,  disc , img(FILE_TYPE) , originalFileName(dynamic)
  return {
    TITLE: body.title,
    DISC: body.disc,
    IMAGE: body.img || "",
    ORIGINAL_FILE_NAME: body.originalFileName,
  };
}

export { rgmcat_m };
