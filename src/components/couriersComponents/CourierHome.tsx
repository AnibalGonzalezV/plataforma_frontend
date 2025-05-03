import { SideBar } from '../SideBar';

function CourierHome() {

  return (
    <>
        <div className="flex min-h-screen bg-gray-800">
            <SideBar/>
            
            <h1 className="text-center text-lg mb-2 font-bold text-white">Home Repartidor</h1>
        </div>
    </>
  )
}

export default CourierHome;
