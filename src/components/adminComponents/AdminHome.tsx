import { SideBar } from '../SideBar';

function AdminHome() {

  return (
    <>
        <div className="flex min-h-screen bg-gray-800">
            <SideBar/>
            
            <h1 className="text-center text-lg mb-2 font-bold text-white">Home Administrador</h1>
        </div>
    </>
  )
}

export default AdminHome;
