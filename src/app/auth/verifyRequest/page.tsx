"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image'

export default function VerifyRequest() {
    return (        
        <main className="">
            <div className=' py-40 flex items-center justify-center'>
                <div className='flex justify-center items-center pb-5'>
                    <p className='font-serif text-xl italic font-bold text-red-500'>Check&nbsp;</p>
                    <p className='font-serif text-xl italic font-bold text-yellow-500'>Your&nbsp;</p>
                    <p className='font-serif text-xl italic font-bold text-blue-500'>Email!</p>
                </div>
            </div>
        </main>
    )
}