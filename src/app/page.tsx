"use client"; // TODO maybe make this a server rendered component.

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import SignInButton from './components/SignInButton';

export default function Home() {
    const { data: session } = useSession();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        fetch('/api/teams/getTeam')
            .then((res) => res.json())
            .then((data) => {
                setTeam(data);
                console.log(data)
            })
    }, [])


    if (!session) {
        return (
            <main>
                <div className=' py-40 flex items-center justify-center'>
                    <div className="w-fit bg-yellow-200 p-10">
                        <div className='flex justify-center items-center'>
                            <p className=' text-xl'>Welcome to&nbsp;</p>
                            <p className=' text-xl font-bold'>YouGuys!</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <SignInButton />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="">
            <div className=' py-40 flex items-center justify-center'>
                <div className="w-fit bg-yellow-200 p-10">
                    <div className='flex justify-center items-center pb-5'>
                        <p className=' text-xl'>Join a&nbsp;</p>
                        <p className=' text-xl font-bold'>team!</p>
                    </div>
                    <div className='flex justify-center items-center py-2'>
                        <a className="text-red-600 font-bold underline italic">Join Random</a>
                    </div>
                    <div className='flex justify-center items-center py-2'>
                        <a className="text-red-600 font-bold underline italic">Create Team</a>
                    </div>
                    <div className='flex justify-center items-center py-2'>
                        <a className="text-red-600 font-bold underline italic">Join Team</a>
                    </div>
                    <div className='flex justify-center items-center py-2'>
                        <input type="text" placeholder='Team Code' className='border-2 border-red-500' />
                    </div>
                    <div className='flex justify-center items-center py-2'>
                        <SignInButton />
                    </div>
                </div>
            </div>
        </main>
    )
}
