import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Pool, types } from 'pg';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../utils/authOptions";
import { emailIsOnTeam } from "../../utils/emailOnTeam";


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

function newTeamCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 4) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function createTeam(user1_id: number) {

    let code = newTeamCode();

    const result = await pool.query("INSERT INTO teams(user1_id, team_code, is_active, creation_time) VALUES($1, $2, $3, $4)", [user1_id, code, true, new Date()]);
    return code;


}


async function handler(req: Request, res: Response) {
    //@ts-ignore authOptions is giving a type error even though it works
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: "Please sign in to create a team.", success: false })
    }
    //@ts-ignore
    const userOnTeam = await emailIsOnTeam(session.user?.id, pool);
    if (userOnTeam) {
        return NextResponse.json({ message: "You must not be on a team to create one.", success: false })
    }
    //@ts-ignore
    let team_code = await createTeam(session.user?.id);
    return NextResponse.json({ code: team_code, success: true }, {
        status: 200
    })
}

export { handler as GET, handler as POST };