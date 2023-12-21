import React from 'react'
import SignInButton from './SignInButton'

type Props = {}

export default function AppBar({}: Props) {
  return (
    <header className='flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow'>
    <SignInButton />
    </header>
  )
}