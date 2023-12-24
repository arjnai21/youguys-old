"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
    const [emailValue, setEmail] = useState('')
    return (        
        <main className="">
            <div className=' py-40 flex items-center justify-center'>
                <div className="w-fit bg-yellow-200 p-10">
                    <div className='flex justify-center items-center pb-5'>
                        <p className=' text-xl font-bold'>Sign In!</p>
                    </div>
                    <div className='flex justify-center items-center py-2'>
                        <a onClick={() => {
                            if(emailValue){
                                signIn("email", {email:  emailValue})
                            } else {
                                alert("No Email Provided")
                            }
                        }} 
                        className="text-red-600 font-bold underline italic">Sign In Using Email</a>
                    </div>
                    <div className='flex justify-center items-center py-2'>
                        <input type="text" placeholder='example@email.com' className='border-2 border-red-500'
                            value={emailValue} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='flex justify-center items-center'><p>or</p></div>
                    <div className='flex justify-center items-center py-2'>
                        <a className="text-red-600 font-bold underline italic"
                        onClick={() => signIn("google")}>Sign In Using Google</a>
                    </div>
                </div>
            </div>
        </main>
    )
}