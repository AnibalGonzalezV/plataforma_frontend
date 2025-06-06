import { useState, useEffect } from 'react';
import { SideBar } from '@/components/SideBar';
import { Header } from '@/components/Header';
import type { User } from '@/services/users';
import { userList } from '@/services/users';
import { EditUserRoles } from './EditUserRoles';
import { AddUser } from './AddUser';

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const loadUsers = async () => {
  try {
    setLoading(true);
    const data = await userList();
    setUsers(data);
    } catch (err: any) {
      setError('Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  loadUsers();
}, []);


  return (
    <>
      <div className="flex min-h-screen bg-gray-800">
        <SideBar />
        <div className="flex flex-1 flex-col">
          <Header />
          <div className="w-full max-w-7xl mx-auto mt-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold text-white">Gestión de Usuarios</h1>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md"
              >
                Agregar Usuario
              </button>
            </div>
          </div>

          {loading && <p className="text-white text-center">Cargando usuarios...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && (
            <div className='w-full max-w-7xl mx-auto overflow-x-auto rounded-lg mt-3'>
                <table className="min-w-full divide-y overflow-x-auto">
                <thead className="bg-gray-700">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Dirección</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Registrado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{user.names} {user.lastNames}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{user.phoneNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{user.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {new Date(user.registrationDate).toLocaleDateString()}
                        </td>
                        <td className="px-9 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-indigo-600 hover:font-semibold"
                        >
                          Edit
                        </button>
                        {/* className="ml-2 text-red-600 hover:text-red-900" Delete */}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                {isModalOpen && selectedUser && (
                  <EditUserRoles
                    user={selectedUser}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
                {isAddUserModalOpen && (
                  <AddUser
                    onClose={() => setIsAddUserModalOpen(false)}
                    onUserAdded={loadUsers}
                  />
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserManagement;
