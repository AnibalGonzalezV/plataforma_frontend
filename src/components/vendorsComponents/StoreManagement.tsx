import SideBar from '@/components/SideBar';
import Header from '@/components/Header';

export default function StoreManagement() {

  return (
    <>
      <div className='flex min-h-screen bg-gray-800'>
          <SideBar/>
          <div className='flex flex-1 flex-col'>
            <Header/>
            <div className='flex flex-1'>
              <main className='flex-1 p-4'>

              </main>
            </div>
          </div>
      </div>
    </>
  )
}