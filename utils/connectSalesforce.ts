import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'


const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const database = process.env.PG_DATABASE;

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});


export default pool