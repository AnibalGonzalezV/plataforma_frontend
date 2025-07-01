import { useAuthStore } from '@/store/AuthStore';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';

export default function UserProfile() {
  const name = useAuthStore(state => state.name);
  const email = useAuthStore(state => state.email);
  const roles = useAuthStore(state => state.roles);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Perfil de usuario</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-base text-gray-400 mb-1">Nombre</label>
                <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white">{name}</div>
              </div>
              <div>
                <label className="block text-base text-gray-400 mb-1">Correo electrónico</label>
                <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white">{email}</div>
              </div>
              <div>
                <label className="block text-base text-gray-400 mb-1">Roles</label>
                <div className="flex flex-wrap gap-2">
                  {roles && roles.length > 0 ? roles.map((role: any) => (
                    <span key={role.id} className="px-3 py-1 rounded-full bg-blue-700 text-white text-sm font-medium border border-blue-500">{role.name}</span>
                  )) : <span className="text-gray-400">Sin roles</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}