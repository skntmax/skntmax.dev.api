import {
  rg_global_category_model,
  rg_global_sub_category_model,
} from "../../models/category_model";
import mongoose from "mongoose";
import path from "node:path";
import { rgmcat_m } from "./model";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { folders } from "../../constans";
import collection from "../../collections/collections";

const ObjectId = mongoose.Types.ObjectId;

const __dirname = dirname(fileURLToPath(import.meta.url));

const addCategory = async (body, files) => {
  try {
    // first saving catgory logo

    if (!files) {
      return Promise.reject("Please provide logo too");
    }

    if (files) {
      let tmpFile = files.img;
      const { name: originalFileName } = tmpFile;
      let ext = originalFileName.split(".")[1];
      let fileName = Date.now() + "." + ext;
      let dst = path.join(
        __dirname,
        `../../assets/Logo/${folders.CATEGORY_FOLDER}/` + fileName
      );

      tmpFile.mv(dst, (err, data) => {
        if (err) return Promise.reject(" category logo not saved");
        console.log("logo saved ");
      });

      body.img = `${folders.CATEGORY_FOLDER}/${fileName}`;
      body.originalFileName = originalFileName;
    }

    let rgmc_model = rgmcat_m(body);

    let new_cat = new rg_global_category_model(rgmc_model);
    await new_cat.save();

    if (body.multi) {
      let prmsub_cat_prms = await Promise.all(
        body.sub_cat.split("==").map(async (ele) => {
          let new_sub_cat = new rg_global_sub_category_model({
            TITLE: ele,
            CAT_ID: new_cat._id,
          });
          return await new_sub_cat.save();
        })
      );
    }

    return Promise.resolve({ data: new_cat });
  } catch (err) {
    console.log("err", err);
    return Promise.reject({ error: err.message });
  }
};

async function getAllCategory() {
  try {
    let catgs = await rg_global_category_model.aggregate([
      {
        $project: {
          _id: 1,
          TITLE: 1,
          IMAGE: 1,
          MULTI: 1,
        },
      },

      {
        $lookup: {
          from: "rg_golbal_master_sub_categories",
          localField: "_id",
          foreignField: "CAT_ID",
          as: "all_cat",
        },
      },
    ]);

    return Promise.resolve({ data: catgs });
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
}

async function getCatIds() {
  try {
    let catgs = await rg_global_category_model.find({}, { _id: 1, TITLE: 1 });

    return Promise.resolve({ data: catgs });
  } catch (err) {
    return Promise.reject({ error: err });
  }
}

async function getCategoryById(cat_id) {
  try {
    let catgs = await rg_global_category_model.aggregate([
      {
        $match: {
          _id: new ObjectId(cat_id),
        },
      },
      {
        $project: {
          _id: 1,
          TITLE: 1,
          IMAGE: 1,
          MULTI: 1,
          DISC: 1,
        },
      },

      {
        $lookup: {
          from: "rg_golbal_master_sub_categories",
          localField: "_id",
          foreignField: "CAT_ID",
          as: "ALL_CAT",
        },
      },
    ]);

    return Promise.resolve({ data: catgs[0] });
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
}

async function updateCategoryById(body, id) {
  try {
    console.log(body);
    let updateCatById = await rg_global_category_model.findByIdAndUpdate(
      id,
      {
        TITLE: body.title,
        DISC: body.disc,
      },
      {
        new: true,
      }
    );

    if (body.multi) {
      let sub_cat_ids_arr = body.sub_cat.map((ele) => ele.split("==")[0]);

      let sub_cat_ids_payload = body.sub_cat.map((ele) => {
        return { TITLE: ele.split("==")[1] };
      });

      for (let i = 0; i < sub_cat_ids_arr.length; i++) {
        // updating first
        var update_sub_cat = await rg_global_sub_category_model
          .updateOne(
            sub_cat_ids_arr[i] != "undefined"
              ? { _id: new ObjectId(sub_cat_ids_arr[i]) }
              : {},
            { $set: sub_cat_ids_payload[i] },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          )
          .exec();

        if (sub_cat_ids_arr[i] == "undefined") {
          let new_sub_cat = new rg_global_sub_category_model({
            ...sub_cat_ids_payload[i],
            CAT_ID: new ObjectId(id),
          });
          new_sub_cat.save();
        }
      }

      // adding a new one if any occures
    }

    if (body.deleted_sub_cat.length > 0) {
      let remove_many = await rg_global_sub_category_model.deleteMany({
        _id: { $in: body.deleted_sub_cat },
      });
    }

    return Promise.resolve({ data: update_sub_cat });
  } catch (err) {
    console.log(err.message);
    return Promise.reject({ error: err.message });
  }
}

// async function fn() {
//    try {

//    return Promise.resolve({data:[]})
//    }catch(err) {
//      return Promise.reject({error:err.message})

//    }

// }

export {
  addCategory,
  getAllCategory,
  getCatIds,
  getCategoryById,
  updateCategoryById,
};
