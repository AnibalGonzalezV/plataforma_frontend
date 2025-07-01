import { CloudAlert } from 'lucide-react';

export default function NotFound () {

    return (
        <>
            <div className='flex justify-center items-center min-h-screen bg-gray-800'>
                <div className='w-full p-6 max-w-sm rounded-2xl shadow-lg bg-gray-950 text-center'>
                    <div className='flex justify-center mb-4'>
                        <CloudAlert className='w-12 h-12 text-red-600' />
                    </div>
                    <h1 className='text-lg font-bold text-red-600 mb-2'>Not Found</h1>
                    <p className='text-gray-400 text-sm'>
                        Este recurso no existe, tal vez.
                    </p>
                </div>
            </div>
        </>
    )
}