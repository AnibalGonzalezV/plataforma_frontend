import SideBar from '@/components/SideBar';
import Header from '@/components/Header';

export default function AdminHome() {

  return (
    <>
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
            <Header/>
            <main className='flex-1 flex flex-col items-center justify-center p-8'>
              <h1 className='text-4xl font-bold mb-8 text-white text-center'>Dashboard Administrador</h1>
              <div className='w-full max-w-4xl bg-gray-800/70 rounded-2xl p-8 border border-gray-700/40 shadow-lg'>
                <p className='text-gray-300 text-lg text-center'>Bienvenido al panel de administración. Aquí podrás gestionar usuarios, tiendas y ver estadísticas del sistema.</p>
              </div>
            </main>
          </div>
      </div>
    </>
  )
}