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
    return Promise.reject({ error: err.message });
  }
}

async function getDataByCatId(cat_id , pn ) {
  try {
    let skip = (pn-1)*10 
    let total = pn*10 
    
    let content_by_cat_id = await rg_golbal_master_content_detail_model.find({
      CAT_ID: new ObjectId(cat_id),
    }).skip(skip).limit(total)

     
    let count = await rg_golbal_master_content_detail_model.find({
      CAT_ID: new ObjectId(cat_id),
    }).countDocuments()


    return Promise.resolve({ data: content_by_cat_id , count } );
  } catch (err) {
    console.log(err);
    return Promise.reject({ error: err.message });
  }
}

async function getContentById(id) {
  try {
    let res = await rg_golbal_master_content_detail_model.findById(id, {
      _id: 0,
      ANSWER: 1,
      QS: 1,
      DISC: 1,
    });
    return Promise.resolve({ data: res });
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
}

async function setContent(payload) {
  try {
    const { title, multi, disc, cat_id, sub_cat_id, answer } = payload;
    if (multi) {
      let content_save = new rg_golbal_master_content_detail_model({
        QS: title,
        DISC: disc,
        CAT_ID: cat_id,
        SUB_CAT_ID: sub_cat_id,
        ANSWER: answer,
      });
      await content_save.save();
      return Promise.resolve({ data: content_save });
    } else {
      let content_save = new rg_golbal_master_content_detail_model({
        QS: title,
        DISC: disc,
        CAT_ID: cat_id,
        ANSWER: answer,
      });

      await content_save.save();
      return Promise.resolve({ data: content_save });
    }
  } catch (err) {
    console.log(err.messaga);
    return Promise.reject(err.message);
  }
}

// function sample(params) {
//     try{

//         return Promise.resolve({data:[]})
//     }catch(err){
//  console.log(err.messaga)
//         return Promise.reject(err.message)
//     }
// }

export { addContent, getDataByCatId, getContentById, setContent };
