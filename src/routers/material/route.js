import Express from "express";
import { FailureStatus, SuccessStatus } from "../../response_utils";
import { addContent, getDataByCatId } from "./controller";
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

content_router.get("/get-content-cat/:cat_id", (req, res) => {
  getDataByCatId(req.params.cat_id)
    .then((response) => {
      res.send(SuccessStatus(response));
    })
    .catch((err) => {
      res.send(FailureStatus(err, "couldn't get list "));
    });
});

export { content_router };
