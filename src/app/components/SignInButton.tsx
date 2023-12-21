"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';




export default function SignInButton() {
    const { data: session } = useSession();
    if (session && session.user) {
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.name}</p>
                <button onClick={() => signOut()} className="text-red-600">
                    Sign Out
                </button>
            </div>
        )
    }
    return <div className="flex gap-4 ml-auto">
        <button onClick={() => signIn()} className="text-green-600">
            Sign In
        </button>
    </div>
}