import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Role, UserData, roleList, updateUserRoles } from '@/services/users';

export default function EditUserRoles({ user, onClose }: UserData) {
  const queryClient = useQueryClient();
  const { data: roles = [], isLoading: loadingRoles } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: roleList
  });

  const userRoleIds = roles
    .filter(role => role.users.includes(user.id))
    .map(role => role.id);

  const [selectedRoles, setSelectedRoles] = useState<number[]>(userRoleIds);

  useEffect(() => {
    setSelectedRoles(userRoleIds);
  }, [roles, user.id]);

  const mutation = useMutation({
    mutationFn: () => updateUserRoles(user.id, selectedRoles),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onClose();
    },
    onError: () => {
      alert('Error al guardar roles.');
    }
  });

  const toggleRole = (roleId: number) => {
    setSelectedRoles(prev =>
      prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]
    );
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-gray-700/40'>
        <h2 className='text-2xl font-bold mb-6 text-white text-center'>Editar Roles de Usuario</h2>
        <div className='mb-6'>
          <p className='text-base text-gray-200 mb-1'><span className='font-semibold'>Nombre:</span> {user.names} {user.lastNames}</p>
          <p className='text-base text-gray-200 mb-1'><span className='font-semibold'>Email:</span> {user.email}</p>
          <p className='text-base text-gray-200'><span className='font-semibold'>Dirección:</span> {user.address}</p>
        </div>
        <div className='mb-8'>
          <h3 className='font-semibold text-base mb-3 text-white'>Roles:</h3>
          {loadingRoles ? (
            <p className='text-sm text-gray-400'>Cargando roles...</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {roles.map(role => (
                <label key={role.id} className='flex items-center gap-2 text-gray-200 bg-gray-800 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700 transition-all'>
                  <input
                    type='checkbox'
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => toggleRole(role.id)}
                    className='accent-blue-600 h-4 w-4 rounded'
                  />
                  {role.name}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className='flex justify-end gap-3 mt-8'>
          <button
            className='px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200'
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancelar
          </button>
          <button
            className='px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg'
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}