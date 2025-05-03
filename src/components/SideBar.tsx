import { useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, Store, ShieldUser, Truck, Settings, LogOut } from "lucide-react";
import { useAuth } from '../context/AuthContext';

const navItems = [
    { icon: Menu, label: "Menu", color: "text-green-600", path: "/home" }, // de momento
    { icon: ShoppingBag, label: "Pedidos", color: "text-white", path: "/home", requiredRoles: ['comprador'] }, // de momento
    { icon: Store, label: "Locatario", color: "text-white", path: "/vendor", requiredRoles: ['vendedor'] }, // de momento
    { icon: Truck, label: "Delivery", color: "text-white", path: "/courier", requiredRoles: ['repartidor'] }, // de momento
    { icon: ShieldUser, label: "Gestión", color: "text-white", path: "/admin", requiredRoles: ['administrador '] }, // de momento
    { icon: Settings, label: "Ajustes", color: "text-white", path: "/home" }, // de momento
];

export function SideBar() {
    const navigate = useNavigate();

    const pathNavigate = (path: string) => {
        navigate(path);
    };

    const { roles, logout } = useAuth();

    const hasRole = (requiredRoles?: string[]) => {
        if (!requiredRoles) return true;
        return roles.some(role => requiredRoles.includes(role.name));
    };

    return (
        <div className="w-64 p-4 border-r h-screen flex flex-col bg-gray-700 rounded-2xl">
            <nav className="space-y-2 flex-grow">
                {navItems.map((item, index) => (
                    hasRole(item.requiredRoles) && <button 
                        key={index} 
                        className={`w-full text-left flex items-center p-2 ${item.color} hover:bg-gray-600 rounded-md`}
                        onClick={() => pathNavigate(item.path)}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </button>
                ))}
            </nav>
            <button 
                className="w-full text-left flex items-center p-2 text-white hover:bg-gray-600 rounded-md mt-auto"
                onClick={logout}
            >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
            </button>
        </div>
    );
}
