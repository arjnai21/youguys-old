import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Pool, types } from 'pg';
import { getServerSession } from "next-auth/next"
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
});

// TODO clean up this query or change the database schema, it's running select id from teams where (select if from users WHERE email='emailaddress') a lot of times
const getTeamQuery = "select users.name, users.email, teams.team_code from users INNER JOIN teams ON users.id=(select user1_id from teams where teams.id=(select id from teams where (select id from users WHERE email=$1) IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=True)) OR users.id=(select user2_id from teams where teams.id=(select id from teams where (select id from users WHERE email=$1) IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=True)) OR users.id=(select user3_id from teams where teams.id=(select id from teams where (select id from users WHERE email=$1) IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=True)) OR users.id=(select user4_id from teams where teams.id=(select id from teams where (select id from users WHERE email=$1) IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=True))OR users.id=(select user5_id from teams where teams.id=(select id from teams where (select id from users WHERE email=$1) IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=True)) WHERE teams.id=(select id from teams where (select id from users WHERE email=$1) IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=True);"

 async function getTeam(user1_email: string | null | undefined) {
    const result = await pool.query(getTeamQuery, [user1_email]);
    return result.rows;


}


async function handler(req: Request, res: Response) {
    //@ts-ignore authOptions is giving a type error even though it works
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: "Please sign in to view your team.", success: false })
    }
    let team_members = await getTeam(session.user?.email);
    return NextResponse.json({ team_members: team_members, success: true }, {
        status: 200
    })
}

export { handler as GET, handler as POST };