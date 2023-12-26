"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import SignInButton from './components/SignInButton';
import SignInWindow from './components/SignInWindow';
import TeamWindow from './components/TeamWindow';

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
                    <SignInWindow/>
                </div>
            </main>
        )
    }
    if(!!session && team.length == 0){
        return (
            <main className="">
                <div className=' py-40 flex items-center justify-center'>
                    <TeamWindow team={team} teamCode={teamCode} setTeam={setTeam} setTeamCode={setTeamCode}/>
                </div>
            </main>
        )
    }
    return (
        <main>
            <p>{team[0]['team_code']}</p>
        </main>
    )
}
