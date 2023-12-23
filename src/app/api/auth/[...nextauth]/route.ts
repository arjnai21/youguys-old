import NextAuth from "next-auth/next";

import { Pool } from 'pg';
import { authOptions } from "../../utils/authOptions";



//@ts-ignore because the adapter thing throws a type error but its not supposed to
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }