import { NextResponse } from "next/server";
import { Pool, types } from 'pg';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../utils/authOptions";
import { emailIsOnTeam } from "../../utils/emailOnTeam";

interface Team {
    id: number,
    user1_id: number,
    user2_id: number | null,
    user3_id: number | null,
    user4_id: number | null,
    user5_id: number | null,
    is_active: boolean,
    team_code: string,
    creation_time: Date
}

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

async function getTeamToJoin(join_code: string) {
    const result = await pool.query("SELECT * FROM teams WHERE team_code=$1 AND is_active=TRUE", [join_code]);
    return result.rows;
}

async function isJoinableTeam(team: Team) {

    return team.user1_id != null && team.user5_id == null;
}

// TODO turn this into a transaction
async function joinTeam(team: Team, userEmail: string | null) {
    await pool.query("UPDATE teams SET is_active=FALSE WHERE team_code=$1 AND is_active=TRUE", [team.team_code]); //set the old team to be inactive
    const query_params = [team.user1_id, team.user2_id, team.user3_id, team.user4_id, team.user5_id, team.team_code, true, team.creation_time]
    let valuesString = "(";
    let foundNull = false;
    // this loop ensures that we insert the new user at the first available slot in user1_id, user2_id, etc...
    for (let i = 0; i < query_params.length; i++) {
        if (query_params[i] == null && !foundNull) {
            valuesString += "(SELECT id from users WHERE email=$" + (i + 1) + "), ";
            query_params[i] = userEmail;
            foundNull = true;
        }
        else {
            valuesString += "$" + (i + 1) + ", "
        }

    }
    valuesString = valuesString.substring(0, valuesString.length - 2) + ")";
    await pool.query("INSERT INTO teams(user1_id, user2_id, user3_id, user4_id, user5_id, team_code, is_active, creation_time) VALUES" + valuesString, query_params);
    return true;

}


async function handler(req: Request, res: Response) {
    //@ts-ignore authOptions is giving a type error even though it works
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ message: "Please sign in join a team.", success: false })
    }
    const data = await req.json();
    const joinCode = data.joinCode;


    if (!joinCode) {
        return NextResponse.json({ message: "joinCode not supplied.", success: false })
    }
    if (await emailIsOnTeam(session.user.email, pool)) { //check if they are on a team
        return NextResponse.json({ message: "You must not be on a team to join a team.", success: false })
    }


    let teamToJoinArr = await getTeamToJoin(joinCode);
    if (teamToJoinArr.length != 1) { // check if they supplied a game code that corresponds to a real team
        return NextResponse.json({ success: false, message: "Invalid game code" })
    }
    const teamToJoin = teamToJoinArr[0];
    if (await isJoinableTeam(teamToJoin)) { // check if there is room for them on the team.
        await joinTeam(teamToJoin, session.user.email);
        return NextResponse.json({ success: true, message: "Joined team" }, {
            status: 200
        })

    }
    return NextResponse.json({ success: false, message: "Invalid game code" })
}

export { handler as GET, handler as POST };