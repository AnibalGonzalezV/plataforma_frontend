import { Link } from 'react-router-dom';
import { Store, Star, MapPin, Edit, Settings } from 'lucide-react';

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
            className='group relative overflow-hidden bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl border border-gray-600/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1'>
                {/* Imagen de fondo con overlay */}
                <div className='relative h-40 overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/80 z-10'></div>
                    <img 
                        src={image || '/store.svg'} 
                        alt={storeName} 
                        className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300'
                    />
                    {/* Overlay de acciones para vendedor */}
                    {roleContext === 'vendor' && (
                        <div className='absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                            <div className='flex gap-2'>
                                <button className='p-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg text-white transition-colors'>
                                    <Edit className='h-4 w-4' />
                                </button>
                                <button className='p-2 bg-gray-700/80 hover:bg-gray-600 rounded-lg text-white transition-colors'>
                                    <Settings className='h-4 w-4' />
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Badge de puntaje */}
                    <div className='absolute bottom-3 left-3 z-20'>
                        <div className='flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg'>
                            <Star className={`h-3 w-3 ${score >= 4 ? 'text-yellow-400 fill-current' : score > 0 ? 'text-orange-400' : 'text-gray-400'}`} />
                            <span className='text-xs font-medium text-white'>{score || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className='p-4'>
                    <div className='flex items-start justify-between mb-2'>
                        <div className='flex items-center gap-2'>
                            <div className='p-1.5 bg-green-600/20 rounded-lg'>
                                <Store className='h-4 w-4 text-green-400' />
                            </div>
                            <h3 className='font-semibold text-white group-hover:text-green-400 transition-colors'>{storeName}</h3>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <MapPin className='h-3 w-3' />
                        <span>Tienda #{id}</span>
                    </div>

                    {/* Indicador de estado */}
                    <div className='mt-3 flex items-center gap-2'>
                        <div className={`w-2 h-2 rounded-full ${
                            score === 0 ? 'bg-gray-500'
                            : score < 4 ? 'bg-orange-500'
                            : 'bg-green-500'
                        }`}/>
                        <span className='text-xs text-gray-400'>
                            {score === 0 ? 'Sin calificaciones' 
                             : score < 4 ? 'Necesita mejorar' 
                             : 'Excelente'}
                        </span>
                    </div>
                </div>

                {/* Efecto de brillo en hover */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
            </Link>
        </>
    )
}