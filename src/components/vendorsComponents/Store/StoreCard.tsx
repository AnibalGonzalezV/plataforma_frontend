import { Link } from 'react-router-dom';

export interface StoreCardProps {
    id: number
    image: string
    storeName: string
    score: number
    roleContext?: 'vendor' | 'client';
}

export function StoreCard({id, image, storeName, score, roleContext}: StoreCardProps) {
    const path = roleContext === 'vendor' ? `/vendor/${id}` : `/tiendas/${id}`;

    return (
        <>
            <Link
            to={path}
            className='overflow-hidden bg-gray-700 rounded-2xl hover:bg-gray-600'>
                <div className='relative'>
                    <img src={image || '/store.svg'} alt={storeName} className='w-full h-40 object-contain object-center'/>
                </div>
                <div className='p-3'>
                    <h3 className='font-medium mb-1 text-sm text-white'>{storeName}</h3>
                    <div className='flex justify-between items-center mb-2'>
                        <div className='flex items-center gap-1'>
                            <span className={`w-2 h-2 rounded-full ${
                                score === 0 ? 'bg-gray-500'
                                : score < 4 ? 'bg-red-500'
                                : 'bg-green-500'
                            }`}/>
                            <span className='text-xs text-white'>{score}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}