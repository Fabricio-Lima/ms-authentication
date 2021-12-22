import { Pool } from "pg";

const SECRET_KEY = process.env.SECRET_KEY

const connectionString = SECRET_KEY;

const db = new Pool({ connectionString });

export default db;
