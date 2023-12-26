import { Pool } from "pg";

export async function emailIsOnTeam(userId: number, pool: Pool) {
    const query_result = await pool.query("SELECT * from teams where $1 IN (user1_id, user2_id, user3_id, user4_id, user5_id) AND is_active=TRUE", [userId]);
    if (query_result.rows.length > 0) {
        return true;
    }
    else {
        return false;
    }
}