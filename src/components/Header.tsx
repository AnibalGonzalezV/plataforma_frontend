import { Search } from 'lucide-react';

interface HeaderProps {
    onSearch: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {

    return (
        <>
            <div className='flex items-center p-4 grap-4 bg-[#424c5c]'>
                <div className='flex-1 relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white'/>
                    <input 
                    type='text'
                    placeholder='Buscar local'
                    onChange={(e) => onSearch(e.target.value)}
                    className='pl-10 pr-10 w-full border border-gray-400 text-white rounded-2xl'
                    />
                </div>
            </div>
        </>
    )
}