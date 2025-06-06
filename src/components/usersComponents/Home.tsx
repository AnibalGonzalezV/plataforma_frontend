import { useState } from 'react';
import { SideBar } from '@/components/SideBar';
import { Header } from '@/components/Header';
import { StoreGrid } from '@/components/vendorsComponents/Store/StoreGrid';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="flex min-h-screen bg-gray-800">
        <SideBar/>
        <div className='flex flex-1 flex-col'>
          <Header onSearch={setSearchTerm}/>
          <div className='flex flex-1'>
            <main className='flex-1 p-4'>
              <StoreGrid search={searchTerm}/>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
