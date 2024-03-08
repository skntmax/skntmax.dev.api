import mongoose, { Schema } from "mongoose";
import collection from "../collections/collections";
const ObjectId = Schema.Types.ObjectId;
const rg_golbal_master_content_detail_schema = new Schema({
  QS: String,
  DISC: String,
  ANSWER: String,
  CAT_ID: {
    type: ObjectId,
    ref: collection.rg_golbal_master_category,
  },
  CREATED_ON: {
    type: Date,
    default: () => new Date(),
  },
  MODIFIED_ON: {
    type: Date,
    default: () => new Date(),
  },
});

const rg_golbal_master_content_detail_model = mongoose.model(
  collection.rg_golbal_master_content_detail,
  rg_golbal_master_content_detail_schema
);

export { rg_golbal_master_content_detail_model };
