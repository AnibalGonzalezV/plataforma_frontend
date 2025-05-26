import { SideBar } from '@/components/SideBar';
import { Header } from '@/components/Header';

function AdminHome() {

  return (
    <>
        <div className="flex min-h-screen bg-gray-800">
            <SideBar/>
            <div className='flex flex-1 flex-col'>
              <Header/>
              <h1 className="text-center text-lg mb-2 font-bold text-white">Home Administrador</h1>
            </div>
        </div>
    </>
  )
}

export default AdminHome;
