import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Search, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/AuthStore';

interface HeaderProps {
    onSearch?: (term: string) => void;
}

const userItems = [
    { icon: User, label: 'Perfil', path: '/home' },
    { icon: Settings, label: 'Configuración', path: '/home' },
];

export default function Header({ onSearch }: HeaderProps) {
    const navigate = useNavigate();

    const name = useAuthStore(state => state.name);
    const email = useAuthStore(state => state.email);
    const logout = useAuthStore(state => state.logout);

    return (
        <>
            <div className='flex items-center p-4 grap-4 bg-[#424c5c]'>
                {onSearch && (
                    <div className='flex-1 relative pr-4'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white'/>
                        <input 
                        type='text'
                        placeholder='Buscar local'
                        onChange={(e) => onSearch(e.target.value)}
                        className='pl-10 pr-10 w-full border border-gray-400 text-white rounded-2xl'
                        />
                    </div>
                )}
                <div className='pr-2 ml-auto'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                            <Avatar className='h-8 w-8 bg-gray-700 text-white'>
                                <AvatarImage src='/placeholder.svg' alt='Avatar' />
                                <AvatarFallback>{name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                            </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56 bg-[#424c5c]' align='end' forceMount>
                            <DropdownMenuLabel className='font-normal'>
                                <div className='flex flex-col space-y-1'>
                                    <p className='text-sm font-medium leading-none text-white'>{name}</p>
                                    <p className='text-xs leading-none text-muted-foreground text-white'>{email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {userItems.map((item, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onSelect={() => navigate(item.path)}
                                        className='hover:bg-gray-500 transition-all duration-300 rounded-md cursor-pointer'
                                    >
                                        <item.icon className='mr-2 h-4 w-4 text-white' />
                                        <span className='text-white'>{item.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                            <DropdownMenuItem 
                                className='hover:bg-gray-500 transition-all duration-300 rounded-md'
                                onSelect={() => {
                                    logout();
                                    navigate('/');
                                }}
                            >
                            <LogOut className='mr-2 h-4 w-4 text-white' />
                            <span className='text-white'>Cerrar sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}