import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import PostgresAdapter from "@auth/pg-adapter"

export const authOptions = {
    //@ts-ignore because the adapter thing throws a type error but its not supposed to
    adapter: PostgresAdapter(pool),
    secret: process.env.SECRET,
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    pages: {
        signIn: '/auth/signin',
        verifyRequest: '/auth/verifyRequest'
    },
    callbacks: {
        //@ts-ignore
        async redirect({ url, baseUrl }) {
            return '/'
        },
    }
}