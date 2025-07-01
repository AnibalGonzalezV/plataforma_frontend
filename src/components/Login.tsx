import { useState, FormEvent, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/auth';
import { useAuthStore } from '@/store/AuthStore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const id = useAuthStore(state => state.id);
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
        if (id !== -1) {
            navigate('/tiendas');
        }
    }, [id, navigate]);

    const mutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.access_token);
            checkAuth();
            navigate('/tiendas');
        },
        onError: () => {
            setErrorMessage('Usuario y/o Contraseña incorrecta');
        },
    });

    const LoginForm = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        mutation.mutate();
    };

    
    return (
        <>
            <div className='flex justify-center items-center min-h-screen bg-gray-800'>
                <div className='w-full p-6 max-w-sm rounded-2xl shadow-lg bg-gray-950'>
                    <h1 className='text-center text-lg mb-2 font-bold text-white'>Inicio de Sesión</h1>

                    <form onSubmit={LoginForm}>
                        {errorMessage && (
                            <div className='mb-4 text-sm text-center text-white bg-red-600 px-3 py-2 rounded-2xl'>
                                {errorMessage}
                            </div>
                        )}
                        <div className='mb-4'>
                            <label className='block text-sm mb-1 text-gray-300'>Email:</label>
                            <input 
                            type='email' 
                            placeholder='user@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full px-3 py-2 border border-gray-400 rounded text-white' 
                            />
                        </div>
                        <div className='mb-4 relative'>
                            <label className='block text-sm mb-1 text-gray-300'>Contraseña:</label>
                            <input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-400 rounded text-white'
                            required
                            />
                        </div>
                        <button
                        type='submit'
                        className='w-full py-2 rounded bg-gradient-to-r bg-gray-600 hover:bg-gray-700 text-white'
                        >
                            Login
                        </button>
                        <p className='text-sm mt-4 text-gray-500'>
                            ¿No estas registrado? <a href='/register' className='text-blue-500 hover:text-blue-600'>Registrarse</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}