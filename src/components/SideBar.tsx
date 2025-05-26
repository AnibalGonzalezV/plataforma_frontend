import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, Store, ShieldUser, Truck } from "lucide-react";
import { useAuth } from '@/context/AuthContext';

const navItems = [
    { icon: ShoppingBag, label: "Pedidos", color: "text-white", path: "/home", requiredRoles: ['comprador'] }, // de momento
    { icon: Store, label: "Locatario", color: "text-white", path: "/vendor", requiredRoles: ['vendedor'] }, // de momento
    { icon: Truck, label: "Delivery", color: "text-white", path: "/courier", requiredRoles: ['repartidor'] }, // de momento
    { icon: ShieldUser, label: "Gestión", color: "text-white", path: "/admin", requiredRoles: ['administrador'] }, // de momento
];

export function SideBar() {
    const navigate = useNavigate();

    const pathNavigate = (path: string) => {
        navigate(path);
    };

    const { roles } = useAuth();

    const hasRole = (requiredRoles?: string[]) => {
        if (!requiredRoles) return true;
        return roles.some(role => requiredRoles.includes(role.name));
    };

    const [isOpen, setOpen] = useState(false);

    return (
        <div className={`flex flex-col h-screen sticky top-0 transition-all duration-300 p-4 bg-gray-700 ${isOpen ? 'w-52' : 'w-16'}`}>
            <button
                onClick={() => setOpen(!isOpen)}
                className="w-full flex items-center justify-start p-2 text-green-600 hover:bg-gray-600 rounded-md mb-4 transition-all duration-300"
            >
                <div className="w-6 flex justify-center flex-shrink-0 ml-[-4px]">
                    <Menu className="h-5 w-5" />
                </div>
                <span className={`ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}>
                    Menú
                </span>
            </button>

            <nav className="space-y-2 flex-grow">
                {navItems.map((item, index) => (
                    hasRole(item.requiredRoles) && (
                        <button
                            key={index}
                            className={`w-full flex items-center justify-start p-2 ${item.color} hover:bg-gray-600 rounded-md transition-all duration-300`}
                            onClick={() => pathNavigate(item.path)}
                        >
                            <div className="w-6 flex justify-center flex-shrink-0 ml-[-4px]">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className={`ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}>
                                {item.label}
                            </span>
                        </button>
                    )
                ))}
            </nav>
        </div>
    );
}
