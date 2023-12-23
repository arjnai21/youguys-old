import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from 'pg';

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
const handler = NextAuth({
    //@ts-ignore because the adapter thing throws a type error but its not supposed to
    adapter: PostgresAdapter(pool),
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ]
});

export { handler as GET, handler as POST }