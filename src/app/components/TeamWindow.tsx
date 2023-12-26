"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import SignInButton from './SignInButton';

interface Props {
    setTeam: Function;
    team: Array<any>;
    setTeamCode: Function;
    teamCode: string;
}

export default function TeamWindow(props: Props){

    return (
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
                                        props.setTeam(data.team_members);
                                        console.log(props.team)
                                    })
                            }else{
                                alert(data.message)
                            }
                        })
                }}>Create Team</a>
            </div>
            <div className='flex justify-center items-center py-2'>
                <input type="text" placeholder='Team Code' className='border-2 border-red-500'
                onChange={(e) => props.setTeamCode(e.target.value)} />
                <a className=" bg-gray-300 outline"
                onClick={() => {
                    fetch('/api/teams/joinTeam', {
                        method: "POST",
                        headers: new Headers({
                            'Content-Type': 'application/json',
                        }),
                        body: JSON.stringify({
                            joinCode: props.teamCode
                        })
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if(data.success){
                                fetch('/api/teams/getTeam')
                                    .then((res) => res.json())
                                    .then((data) => {
                                        props.setTeam(data.team_members);
                                        console.log(props.team)
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
    )
}