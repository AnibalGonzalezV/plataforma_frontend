import { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { checkAuth } = useAuth();

    const mutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.access_token);
            checkAuth();
            navigate('/tiendas');
        },
        onError: (error: any) => {
            alert(error.message || 'Login failed');
        },
    });

    const LoginForm = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        mutation.mutate();
    };

    
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-800">
                <div className="w-full p-6 max-w-sm rounded-2xl shadow-lg bg-gray-950">
                    <h1 className="text-center text-lg mb-2 font-bold text-white">Inicio de Sesión</h1>

                    <form onSubmit={LoginForm}>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 text-gray-300">Email:</label>
                            <input 
                            type="email" 
                            placeholder="user@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white" 
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm mb-1 text-gray-300">Contraseña:</label>
                            <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white"
                            required
                            />
                        </div>
                        <div className="mb-4 justify-between">
                            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">¿Olvidaste tu contraseña?</a>
                        </div>
                        <button
                        type="submit"
                        className="w-full py-2 rounded bg-gradient-to-r bg-gray-600 hover:bg-gray-700 text-white"
                        >
                            Login
                        </button>
                        <p className="text-sm mt-4 text-gray-500">
                            ¿No estas registrado? <a href="/register" className="text-blue-500 hover:text-blue-600">Registrarse</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;