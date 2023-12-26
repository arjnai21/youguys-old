import { NextResponse } from "next/server";
import { Pool } from 'pg';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../utils/authOptions";

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
});


async function getSessionToken(userId: number) {
    const result = await pool.query('SELECT "sessionToken" from sessions where "userId"=$1 AND expires > CURRENT_DATE LIMIT 1', [userId]);
    console.log(result.rows);
    return result.rows[0].sessionToken;

}

async function handler(req: Request, res: Response) {
    //@ts-ignore authOptions is giving a type error even though it works
    const session = await getServerSession(authOptions);
    //@ts-ignore
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ message: "Please sign to get a session token.", success: false })
    }
    //@ts-ignore
    const token = await getSessionToken(session.user.id);


    return NextResponse.json({ success: true, sessionToken: token })
}

export { handler as GET, handler as POST };