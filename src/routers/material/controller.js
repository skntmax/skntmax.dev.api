import { rg_golbal_master_content_detail_model } from "../../models/material_model";
import { rgcontent_m } from "./model";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
async function addContent(body) {
  try {
    let content_mode = rgcontent_m(body);
    let new_content = new rg_golbal_master_content_detail_model(content_mode);
    await new_content.save();
    return Promise.resolve({ data: new_content });
  } catch (err) {
    return Promise.reject(err.message);
  }
}

async function getDataByCatId(cat_id) {
  try {
    let content_by_cat_id = await rg_golbal_master_content_detail_model.find({
      CAT_ID: new ObjectId(cat_id),
    });
    return Promise.resolve({ data: content_by_cat_id });
  } catch (err) {
    console.log(err);
    return Promise.reject({ error: err.message });
  }
}


// function sample(params) {
//     try{

//         return Promise.resolve({data:[]})
//     }catch(err){
//         return Promise.reject(err)
//     }
// }

export { addContent, getDataByCatId };
