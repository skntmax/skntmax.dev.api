import express from "express";
import fileupload from "express-fileupload";
import path from "node:path";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { category_router } from "./category/route";
import { content_router } from "./material/route";
import { auth_router } from "./auth/routes";
const __dirname = dirname(fileURLToPath(import.meta.url));

function rootRouter(app) {
  app.use("/v1", category_router);
  app.use("/v1", content_router);
  app.use("/v1", auth_router);
  
}

export { rootRouter };
