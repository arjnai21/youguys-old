"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import SignInButton from './components/SignInButton';

export default function Home() {
    const { data: session } = useSession();
    const [team, setTeam] = useState([]);
    const [teamCode, setTeamCode] = useState('')

    useEffect(() => {
        fetch('/api/teams/getTeam')
            .then((res) => res.json())
            .then((data) => {
                setTeam(data.team_members);
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
    if(!!session && team.length == 0){
        console.log(team)
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
                            <a className="text-red-600 font-bold underline italic"
                            onClick={() => {
                                console.log("click")
                                fetch('/api/teams/createTeam')
                                    .then((res) => res.json())
                                    .then((data) => {
                                        console.log(data)
                                        if(data.success){
                                            fetch('/api/teams/getTeam')
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    setTeam(data.team_members);
                                                    console.log(team)
                                                })
                                        }else{
                                            alert(data.message)
                                        }
                                    })
                            }}>Create Team</a>
                        </div>
                        <div className='flex justify-center items-center py-2'>
                            <input type="text" placeholder='Team Code' className='border-2 border-red-500'
                            onChange={(e) => setTeamCode(e.target.value)} />
                            <a className=" bg-gray-300 outline"
                            onClick={() => {
                                fetch('/api/teams/joinTeam', {
                                    method: "POST",
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                    }),
                                    body: JSON.stringify({
                                        joinCode: teamCode
                                    })
                                })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        if(data.success){
                                            fetch('/api/teams/getTeam')
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    setTeam(data.team_members);
                                                    console.log(team)
                                                })
                                        }else{
                                            alert(data.message)
                                        }
                                    })
                            }}>Join Team</a>
                        </div>
                        <div className='flex justify-center items-center py-2'>
                            <SignInButton />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
    console.log(team)
    return (
        <main>
            <p>{team[0]['team_code']}</p>
        </main>
    )
}
