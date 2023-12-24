import { Pool } from "pg";

export async function emailIsOnTeam(user_email: string | null | undefined, pool: Pool) {
    const query_result = await pool.query("SELECT * from teams where (select id from users where email=$1) IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=TRUE", [user_email]);
    if (query_result.rows.length > 0) {
        return true;
    }
    else {
        return false;
    }
}