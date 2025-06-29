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
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-6'>
        <h2 className='text-xl font-bold mb-2'>Edit User Roles</h2>
        <p className='text-sm text-black mb-2'>
            <span className='font-semibold'>Nombre:</span> {user.names} {user.lastNames}
        </p>
        <p className='text-sm text-black mb-2'>
            <span className='font-semibold'>Email:</span> {user.email}
        </p>
        <p className='text-sm text-black mb-2'>
            <span className='font-semibold'>Dirección:</span> {user.address}
        </p>

        <div className='mb-4'>
          <h3 className='font-semibold text-sm mb-2'>Roles:</h3>
          {loadingRoles ? (
            <p className='text-sm text-gray-500'>Cargando roles...</p>
          ) : (
            roles.map(role => (
              <label key={role.id} className='block text-sm text-black mb-1'>
                <input
                  type='checkbox'
                  checked={selectedRoles.includes(role.id)}
                  onChange={() => toggleRole(role.id)}
                  className='mr-2'
                />
                {role.name}
              </label>
            ))
          )}
        </div>

        <div className='flex justify-end space-x-2 mt-6'>
          <button
            className='px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white'
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700'
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}