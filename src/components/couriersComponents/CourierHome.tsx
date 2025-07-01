import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import { CourierMenu } from './CourierMenu';

function CourierHome() {

  return (
    <>
        <div className='flex min-h-screen bg-gray-800'>
            <SideBar/>
            <div className='flex flex-1 flex-col'>
              <Header/>
              <CourierMenu/>
            </div>
        </div>
    </>
  )
}

export default CourierHome;
