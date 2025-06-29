import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import PaginationFooter from '@/components/Pagination';
import { User, userList, statusUser } from '@/services/users';
import EditUserRoles from '@/components/adminComponents/UsersManage/EditUserRoles';
import AddUser from '@/components/adminComponents/UsersManage/AddUser';

export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: users = [], isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userList,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ userId, option }: { userId: number; option: 'enable' | 'disable' }) =>
      statusUser(userId, option),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      alert('Error al cambiar estado del usuario');
    },
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (user: User) => {
    toggleStatusMutation.mutate({
      userId: user.id,
      option: user.isActive ? 'disable' : 'enable',
    });
  };

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastItem = currentPage * usersPerPage;
  const indexOfFirstItem = indexOfLastItem - usersPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='flex min-h-screen bg-gray-800'>
        <SideBar />
        <div className='flex flex-1 flex-col min-h-0'>
          <Header />
          <div className='w-full max-w-7xl mx-auto mt-4'>
            <div className='flex justify-between items-center'>
              <h1 className='text-lg font-bold text-white'>Gestión de Usuarios</h1>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md'
              >
                Agregar Usuario
              </button>
            </div>
          </div>

          {isLoading && <p className='text-white text-center'>Cargando usuarios...</p>}
          {isError && <p className='text-red-500 text-center'>Error al obtener usuarios.</p>}

          {!isLoading && !isError && (
            <main className='flex flex-col flex-1 overflow-hidden pb-6'>
            <div className='flex-grow overflow-auto'>
              <div className='w-full max-w-7xl mx-auto overflow-x-auto rounded-lg mt-3'>
                <table className='min-w-full divide-y overflow-x-auto'>
                <thead className='bg-gray-700'>
                    <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Nombre</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Email</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Teléfono</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Dirección</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Estado</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Registrado</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {currentItems.map((user) => (
                    <tr key={user.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{user.names} {user.lastNames}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{user.email}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{user.phoneNumber}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{user.address}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
                        {new Date(user.registrationDate).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium w-40'>
                          <div className='flex gap-2'>
                            <button
                              onClick={() => handleEditClick(user)}
                              className='text-indigo-600 hover:font-bold transition-colors'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleToggleStatus(user)}
                              className={`${
                                user.isActive
                                  ? 'text-red-600 hover:font-bold'
                                  : 'text-green-600 hover:font-bold'
                              } transition-colors`}
                            >
                              {user.isActive ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
              </div>
                {isModalOpen && selectedUser && (
                  <EditUserRoles
                    user={selectedUser}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
                {isAddUserModalOpen && (
                  <AddUser
                    onClose={() => setIsAddUserModalOpen(false)}
                    onUserAdded={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
                  />
                )}
            </div>
              <div className='w-full max-w-7xl mx-auto mt-4'>
                <PaginationFooter
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                />
              </div>
            </main>
          )}
        </div>
      </div>
    </>
  );
}
