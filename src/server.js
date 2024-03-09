import Express from "express";
import dotenv from "./dotenv";
import globalMiddleware from "./global_middlware/middleware";
import { SuccessStatus } from "./response_utils";
import { initDb } from "./connection/db_connect";
import fs from "fs";
// __dirname
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
// __dirname

let app = Express();

// console.log("dotenv.DB" ,dotenv.DB_URL)

await initDb();

app.get("/check-health", (req, res) => {
  console.log("health check ok !!");
  res.send(SuccessStatus([], "heath check success"));
});

globalMiddleware(app);

// folder intiation portion
let assets = path.join(__dirname, "assets/Logo/categories_logo");
if (!fs.existsSync(assets)) {
  fs.mkdirSync(assets, { recursive: true });
}

// folder intiation portion

app.listen(dotenv.PORT, () => [
  console.log(`server started at ${dotenv.PORT} `),
]);
