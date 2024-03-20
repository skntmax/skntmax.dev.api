import 'dotenv/config'

export default {
    PORT:process.env.PORT || 5000 ,
    DB_URL:process.env.DB ,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID
}