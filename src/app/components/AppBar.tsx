import React from 'react'
import SignInButton from './SignInButton'
import Image from 'next/image'

type Props = {}

export default function AppBar({ }: Props) {
    const logos = ["logo1.png", "logo2.png", "logo3.png", "logo4.png", "logo5.png"];
    const random = Math.floor(Math.random() * logos.length);
    const logo = logos[random];
    return (
        <div className=''>
            <div className='flex justify-center'>
                <Image className='p-10'
                    src={"/logos/"+logo}
                    width={300}
                    height={300}
                    alt="logo"
                />
            </div>
            <div className='flex justify-center bg-gray-300 p-2'>
                <div className='flex-auto flex justify-center'>
                    <a className=' text-xl font-bold italic underline text-blue-500' href='/'>Write a Sketch</a>
                </div>
                <div className='flex-auto flex justify-center'>
                    <a className='text-xl font-bold italic underline text-blue-500'>Vote on Submissions</a>
                </div>
                <div className='flex-auto flex justify-center'>
                    <SignInButton/>
                </div>
            </div>
        </div>
    )
}