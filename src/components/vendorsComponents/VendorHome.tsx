import { SideBar } from '@/components/SideBar';

function VendorHome() {

  return (
    <>
        <div className="flex min-h-screen bg-gray-800">
            <SideBar/>
            
            <h1 className="text-center text-lg mb-2 font-bold text-white">Home Vendedor</h1>
        </div>
    </>
  )
}

export default VendorHome;
