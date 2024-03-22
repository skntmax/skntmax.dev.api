import mongoose, { Schema } from "mongoose";
import collection from "../collections/collections";
import { traffic_from, user_types } from "../utils";

const rg_global_users_schema = new Schema({
  USERNAME: String,
  EMAIL: {
    type: String,
  },
  PASSWORD: String,
  USER_TYPE: {
    type: String,
    default: () => user_types.normal,
  },
  BY: {
    type: String,
    default: () => traffic_from.default,
  },
  USER_OBJ: Object,
  PROFILE_PIC: String,
  CREATED_ON: {
    type: Date,
    default: () => new Date(),
  },
  MODIFIED_ON: {
    type: Date,
    default: () => new Date(),
  },
});

let user_model = mongoose.model(
  collection.rg_golbal_master_user,
  rg_global_users_schema
);

export { user_model };
