import { useState, FormEvent } from 'react'

function Register() {
    const [names, setNames] = useState('');
    const [lastNames, setLastNames] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const RegisterForm = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        console.log("Names:", names);
        console.log("Last Names:", lastNames);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Address:", address);
        console.log("Phone Number:", phoneNumber);
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-800">
                <div className="w-full p-6 max-w-sm rounded-2xl shadow-lg bg-gray-950">
                    <h1 className="text-center text-lg mb-2 font-bold text-white">Registrarse</h1>

                    <form onSubmit={RegisterForm}>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 text-gray-300">Nombres:</label>
                            <input 
                            type="text" 
                            placeholder="nombres"
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white" 
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm mb-1 text-gray-300">Apellidos:</label>
                            <input
                            type="text"
                            placeholder="apellidos"
                            value={lastNames}
                            onChange={(e) => setLastNames(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white"
                            required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm mb-1 text-gray-300">Email:</label>
                            <input
                            type="email"
                            placeholder="user@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white"
                            required
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
                        <div className="mb-4 relative">
                            <label className="block text-sm mb-1 text-gray-300">Dirección:</label>
                            <input
                            type="text"
                            placeholder="dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white"
                            required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm mb-1 text-gray-300">Número de celular:</label>
                            <input
                            type="tel"
                            placeholder="+56912345678"
                            pattern="\+569[0-9]{8}"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white"
                            required
                            />
                        </div>
                        <button
                        type="submit"
                        className="w-full py-2 rounded bg-gradient-to-r bg-gray-600 hover:bg-gray-700 text-white"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register