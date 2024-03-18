import Express from "express";
import { FailureStatus, SuccessStatus } from "../../response_utils";
import {
  addContent,
  getContentById,
  getDataByCatId,
  setContent,
} from "./controller";
let content_router = Express.Router();

content_router.post("/add-content", (req, res) => {
  addContent(req.body)
    .then((response) => {
      res.send(SuccessStatus(response));
    })
    .catch((err) => {
      res.send(FailureStatus(err, "couldn't get content"));
    });
});

content_router.get("/get-content-cat/:cat_id/:isMulti/:pn", (req, res) => {
  getDataByCatId(req.params.cat_id,req.params.isMulti , req.params.pn)
    .then((response) => {
      res.send(SuccessStatus(response));
    })
    .catch((err) => {
      res.send(FailureStatus(err, "couldn't get list "));
    });
});

content_router.get("/get-content-by/:id", (req, res) => {
  getContentById(req.params.id)
    .then((response) => {
      res.send(SuccessStatus(response));
    })
    .catch((err) => {
      res.send(FailureStatus(err, "couldn't get item "));
    });
});

content_router.post("/store-content", (req, res) => {
  setContent(req.body)
    .then((response) => {
      res.send(SuccessStatus(response));
    })
    .catch((err) => {
      res.send(FailureStatus(err, "couldn't get item "));
    });
});

export { content_router };
