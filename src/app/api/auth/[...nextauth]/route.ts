import NextAuth from "next-auth/next";

import { Pool } from 'pg';
import { authOptions } from "../../utils/authOptions";

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: false
    }
})

//@ts-ignore because the adapter thing throws a type error but its not supposed to
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }