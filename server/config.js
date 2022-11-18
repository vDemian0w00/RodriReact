import { config } from "dotenv";
config();

export const PORT = process.env.PORT;

export const MYSQLDATABASE = process.env.MYSQLDATABASE;
export const MYSQLUSER = process.env.MYSQLUSER;
export const MYSQLPASSWORD = process.env.MYSQLPASSWORD;
export const MYSQLHOST = process.env.MYSQLHOST;
export const MYSQLPORT = process.env.MYSQLPORT;

export const SECRET_KEY = process.env.SECRET_KEY;