import "dotenv/config";

export default {
  PORT: process.env.PORT || 5000,
  REDIS_PORT: process.env.REDIS_PORT,
  DB_URL: process.env.DB,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};
