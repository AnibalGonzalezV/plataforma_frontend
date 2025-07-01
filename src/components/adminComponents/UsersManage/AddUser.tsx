import { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/register';

type AddUserProps = {
  onClose: () => void;
  onUserAdded: () => void;
};

export default function AddUser({ onClose, onUserAdded }: AddUserProps) {
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () =>
      register(email, password, names, lastNames, address, phoneNumber),
    onSuccess: () => {
      onUserAdded();
      onClose();
    },
    onError: () => {
      setErrorMessage('Error al registrar usuario');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-gray-700/40'>
        <h2 className='text-2xl font-bold mb-6 text-white text-center'>Agregar Usuario</h2>
        {errorMessage && (
          <p className='text-red-400 mb-4 text-center'>{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-base text-gray-200 mb-1'>Nombres</label>
            <input
              type='text'
              value={names}
              onChange={(e) => setNames(e.target.value)}
              required
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>
          <div>
            <label className='block text-base text-gray-200 mb-1'>Apellidos</label>
            <input
              type='text'
              value={lastNames}
              onChange={(e) => setLastNames(e.target.value)}
              required
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>
          <div>
            <label className='block text-base text-gray-200 mb-1'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>
          <div>
            <label className='block text-base text-gray-200 mb-1'>Contraseña</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>
          <div>
            <label className='block text-base text-gray-200 mb-1'>Dirección</label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>
          <div>
            <label className='block text-base text-gray-200 mb-1'>Número de celular</label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none'>+569</span>
              <input
                type='tel'
                pattern='[0-9]{8}'
                placeholder='12345678'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className='w-full pl-14 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              />
            </div>
          </div>
          <div className='flex justify-end gap-3 pt-6'>
            <button
              type='button'
              onClick={onClose}
              disabled={mutation.isPending}
              className='px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}