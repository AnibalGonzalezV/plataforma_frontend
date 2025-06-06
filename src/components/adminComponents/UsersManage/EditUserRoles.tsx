import { useEffect, useState } from 'react';
import { Role, UserData, roleList, updateUserRoles } from '@/services/users';

export function EditUserRoles({ user, onClose }: UserData) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRoles() {
      try {
        const data = await roleList();
        setRoles(data);

        const userRoleIds = data
          .filter((role: Role) => role.users.includes(user.id))
          .map((role: Role) => role.id);

        setSelectedRoles(userRoleIds);
      } catch (err) {
        console.error('Error cargando: roles');
      }
    }

    loadRoles();
  }, [user.id]);

  const toggleRole = (roleId: number) => {
    setSelectedRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const saveChanges = async () => {
    try {
      setLoading(true);
      await updateUserRoles(user.id, selectedRoles);
      onClose();
    } catch (error) {
      console.error('Error updating roles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-2">Edit User Roles</h2>
        <p className="text-sm text-black mb-2">
            <span className="font-semibold">Nombre:</span> {user.names} {user.lastNames}
        </p>
        <p className="text-sm text-black mb-2">
            <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-sm text-black mb-2">
            <span className="font-semibold">Dirección:</span> {user.address}
        </p>

        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Roles:</h3>
          {roles.map(role => (
            <label key={role.id} className="block text-sm text-black mb-1">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role.id)}
                onChange={() => toggleRole(role.id)}
                className="mr-2"
              />
              {role.name}
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
            onClick={saveChanges}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
