const dotenv=require("dotenv")
dotenv.config();
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const ADMIN_MAIL = process.env.ADMIN_MAIL;

module.exports={
SMTP_HOST,
  SMTP_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
ADMIN_MAIL
};