"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';




export default function SignInButton() {
    const { data: session } = useSession();
    if (session && session.user) {
        return (
            <div className="flex-auto flex justify-center">
                <a onClick={() => signOut()} className='text-xl font-bold italic underline text-blue-500'>Sign Out {session.user.name}</a>
            </div>
        )
    }
    return (
        <div className="flex-auto flex justify-center">
            <a onClick={() => signIn()} className='text-xl font-bold italic underline text-blue-500'>Sign In</a>
        </div>
    )
}