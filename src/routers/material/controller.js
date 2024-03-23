import config from "../../config";
import constans, { redis_keys } from "../../constans";
import {
  rg_global_category_model,
  rg_global_sub_category_model,
} from "../../models/category_model";
import { rg_golbal_master_content_detail_model } from "../../models/material_model";
import { redis_client } from "../Redis/RedisConn";
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



export async function  forSitemByItemId(itemId) {
    try{
      let new_content
        let cat_exist = rg_global_category_model.find({_id:itemId})
        if(cat_exist!=null) {
          new_content =await  rg_golbal_master_content_detail_model.find({CAT_ID:new ObjectId(itemId)} , { _id:1 , QS:1 ,DISC:1 , CAT_ID:1 , SUB_CAT_ID:1 ,  CREATED_ON:1});
          return Promise.resolve({data:new_content})
        }else{
          new_content =await  rg_golbal_master_content_detail_model.find({SUB_CAT_ID:new ObjectId(itemId)} , { _id:1 , QS:1 ,ANSWER:1 ,DISC:1,CAT_ID:1 , SUB_CAT_ID:1 ,CREATED_ON:1});
          return Promise.resolve({data:new_content})
        }

    }catch(err){
 console.log(err.messaga)
        return Promise.reject(err.message)
    }
}



async function getDataByCatId(cat_id, isMulti, pn) {
  try {
    let skip = (pn - 1) * 10;
    let total = pn * 10;

    // first check category  is present or not
    let content_exist = await redis_client.get(
      `byte_get_content:${cat_id}:${isMulti}:${pn}`
    );

    if (content_exist != null) {
      return Promise.resolve(JSON.parse(content_exist));
    } else {
      if (isMulti == "false") {
        // single category present , no subtopic

        let content_by_cat_id = await rg_golbal_master_content_detail_model
          .find({
            CAT_ID: new ObjectId(cat_id),
          })
          .skip(skip)
          .limit(total);

        let count = await rg_golbal_master_content_detail_model
          .find({
            CAT_ID: new ObjectId(cat_id),
          })
          .countDocuments();

        await redis_client.set(
          `byte_get_content:${cat_id}:${isMulti}:${pn}`,
          JSON.stringify({ data: content_by_cat_id, count })
        );
        await redis_client.expire(
          `byt_get_content:${cat_id}:${isMulti}:${pn}`,
          constans.cache_time
        );

        return Promise.resolve({ data: content_by_cat_id, count });
      } else {
        // category present
        let sub_cat_id = cat_id;
        let content_by_subcat_id = await rg_golbal_master_content_detail_model
          .find({
            SUB_CAT_ID: new ObjectId(sub_cat_id),
          })
          .skip(skip)
          .limit(total);

        let count = await rg_golbal_master_content_detail_model
          .find({
            SUB_CAT_ID: new ObjectId(sub_cat_id),
          })
          .countDocuments();

        await redis_client.set(
          `byte_get_content:${cat_id}:${isMulti}:${pn}`,
          JSON.stringify({ data: content_by_subcat_id, count })
        );
        await redis_client.expire(
          `byt_get_content:${cat_id}:${isMulti}:${pn}`,
          constans.cache_time
        );

        return Promise.resolve({ data: content_by_subcat_id, count });
      }
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({ error: err.message });
  }
}

async function getContentById(id) {
  try {
    let content_exist = await redis_client.get(`get_content_by_id:${id}`);
    if (content_exist != null) {
      return Promise.resolve({ data: JSON.parse(content_exist) });
    }

    let res = await rg_golbal_master_content_detail_model.findById(id, {
      _id: 0,
      ANSWER: 1,
      QS: 1,
      DISC: 1,
    });

    await redis_client.set(`get_content_by_id:${id}`, JSON.stringify(res));
    await redis_client.expire(`get_content_by_id:${id}`, constans.cache_time);

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




export async function getContentId() {
    try{

      
         let id_exist =await redis_client.get(redis_keys.all_content_id)
         if(id_exist!=null) {
          return Promise.resolve({data:JSON.parse(id_exist)})
         }

         let content_ids = await rg_golbal_master_content_detail_model.find({} , {_id:1 ,CAT_ID:1, SUB_CAT_ID:1} )
          
         await redis_client.set(redis_keys.all_content_id , JSON.stringify(content_ids) )
         await redis_client.expire(redis_keys.all_content_id, constans.cache_time )

        return Promise.resolve({data:content_ids})
         
    }catch(err){
 console.log(err.messaga)
        return Promise.reject(err.message)
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
