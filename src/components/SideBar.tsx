import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, ChevronRight, ShoppingBag, Store, ShieldUser, Truck, ListOrdered, Package, ClipboardList, BarChart3 } from 'lucide-react';
import { useAuthStore } from '@/store/AuthStore';

const navItems = {
    comprador: {
        icon: ShoppingBag,
        label: 'Pedidos',
        items: [
            { icon: ShoppingBag, label: 'Tiendas', path: '/tiendas' },
            { icon: ListOrdered, label: 'Mis pedidos', path: '/pedidos' },
        ]
    },
    vendedor: {
        icon: Store,
        label: 'Locatario',
        items: [
            { icon: Store, label: 'Mis Tiendas', path: '/vendor' },
            { icon: Package, label: 'Pedidos', path: '/vendor/pedidos' },
            { icon: Store, label: 'Gestión', path: '/vendor/managment' },
        ]
    },
    repartidor: {
        icon: Truck,
        label: 'Delivery',
        items: [
            { icon: Truck, label: 'Pedidos', path: '/courier' },
            { icon: ClipboardList, label: 'Pedidos para entregar', path: '/courier/pedidos' },
        ]
    },
    administrador: {
        icon: ShieldUser,
        label: 'Gestión',
        items: [
            { icon: BarChart3, label: 'Dashboard', path: '/admin/dashboard' },
            { icon: ShieldUser, label: 'Usuarios', path: '/admin/users' },
        ]
    }
};

export default function SideBar() {
    const navigate = useNavigate();

    const pathNavigate = (path: string) => {
        navigate(path);
    };

    const roles = useAuthStore(state => state.roles);

    const hasRole = (requiredRoles?: string[]) => {
        if (!requiredRoles) return true;
        return roles.some(role => requiredRoles.includes(role.name));
    };

    const [isOpen, setOpen] = useState(false);
    const [openRoles, setOpenRoles] = useState<Record<string, boolean>>({});
    const toggleRole = (role: string) => {
        setOpenRoles(prev => ({ ...prev, [role]: !prev[role] }));
    };

    return (
        <div className={`flex flex-col h-screen sticky top-0 transition-all duration-300 p-4 bg-gray-700 ${isOpen ? 'w-52' : 'w-16'}`}>
            <button
                onClick={() => setOpen(!isOpen)}
                className='w-full flex items-center justify-start p-2 text-green-600 hover:bg-gray-600 rounded-md mb-4 transition-all duration-300'
            >
                <div className='w-6 flex justify-center flex-shrink-0 ml-[-4px]'>
                    <Menu className='h-5 w-5' />
                </div>
                <span className={`ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}>
                    Menú
                </span>
            </button>

            <nav className='space-y-2 flex-grow'>
                {Object.entries(navItems).map(([role, group]) => (
                    hasRole([role]) && (
                        <div key={role}>
                            <button
                                onClick={() => toggleRole(role)}
                                className='w-full flex items-center justify-between p-2 text-white hover:bg-gray-600 rounded-md transition-all duration-300'
                            >
                                <div className='w-6 flex justify-center flex-shrink-0'>
                                    <group.icon className='h-5 w-5' />
                                    <span className={`ml-2 transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}>
                                        {group.label}
                                    </span>
                                </div>
                                {isOpen && (
                                    openRoles[role] ? <ChevronDown className='w-5 h-5' /> : <ChevronRight className='w-5 h-5' />
                                )}
                            </button>

                            {openRoles[role] && isOpen && (
                                <div className='pl-6 mt-1 space-y-1'>
                                    {group.items.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => pathNavigate(item.path)}
                                            className='w-full flex items-center p-2 text-gray-300 hover:bg-gray-600 rounded-md transition'
                                        >
                                            <item.icon className='h-4 w-4' />
                                            <span className='ml-2 whitespace-nowrap'>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                ))}
            </nav>
        </div>
    );
}
