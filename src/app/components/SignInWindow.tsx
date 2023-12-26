import SignInButton from './SignInButton';

export default function SignInWindow(){
    return (
        <div className="w-fit bg-yellow-200 p-10">
            <div className='flex justify-center items-center'>
                <p className=' text-xl'>Welcome to&nbsp;</p>
                <p className=' text-xl font-bold'>YouGuys!</p>
            </div>
            <div className='flex justify-center items-center'>
                <SignInButton />
            </div>
        </div>

    )
}