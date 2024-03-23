import dotenv from "./dotenv.js";
export default {
  port: dotenv.PORT,
  redisPort: dotenv.REDIS_PORT,
  allowedOrigin: ["*"],
  //    db_url: `mongodb://43.204.105.161:27018/${dotenv.DB}`, // dev
  //db_url: `mongodb://43.204.105.161:27019/${dotenv.DB}`, // prod
  // db_url: `mongodb://localhost:27017/${dotenv.DB}`, // local
  secretKey: "asdsadsadasddsadsa",
  defaultPass: "$2a$10$PUcRF6VdSBEPYSl0jDiuzeeqK.4XRqvUrl9VVN39RvIyIX7tm21W6",

  redisConnection: {
    connection: {
      host: "localhost",
      port: dotenv.REDIS_PORT,
    },
  },
};
