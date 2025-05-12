import { SideBar } from '@/components/SideBar';
import { CourierMenu } from './CourierMenu';

function CourierHome() {

  return (
    <>
        <div className="flex min-h-screen bg-gray-800">
            <SideBar/>
            
            <CourierMenu/>
        </div>
    </>
  )
}

export default CourierHome;
