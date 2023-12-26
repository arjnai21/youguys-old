import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/debug';



type Props = {}

export default function Game({ }: Props) {
    // example of how to connect to the socket.
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {

        if (socket === null) {
            fetch("/api/getSessionToken").then((res) => res.json()).then(({ sessionToken }) => {
                const newSocket = io("http://localhost:3002");
                newSocket.on('connect', () => {
                    newSocket.emit('authenticate', { 'token': sessionToken });
                    // set up listeners
                })
                //@ts-ignore
                setSocket(newSocket);
            });

        }
    }, [])

    return (
        <div className=''>
            hello
        </div>
    )
}