import dotenv from "dotenv";
dotenv.config();

export default {
  db: {
    dbHost: process.env.DB_HOST!,
    dbPort: process.env.DB_PORT!,
    dbUser: process.env.DB_USERNAME!,
    dbPassword: process.env.DB_PASSWORD!,
    dbName: process.env.DB_DATABASE_NAME!,
  },
  cloud_name: process.env.CLOUD_NAME!,
    api_nary: {
    cloudKey: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!,
    folderPath: process.env.FOLDER_PATH!,
    publicId_prefix: process.env.PUBLIC_ID_PREFIX!,
  },
  port: process.env.port!,
  googlePass: process.env.PASS_EMAIL_GOOGLE!,
  jwt: {
    accessKey: process.env.JWT_ACCESS_SECRET_KEY!,
    refreshKey: process.env.JWT_REFRESH_SECRET_KEY!,
  },
};
