import { useState } from 'react';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import StoreGrid from '@/components/vendorsComponents/Store/StoreGrid';
import { CartIcon, CartDrawer } from '@/components/carrito_compras';
import { useAuthStore } from '@/store/AuthStore';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const roles = useAuthStore(state => state.roles);
  const isComprador = roles.some(role => role.name === 'comprador');

  return (
    <>
      <div className='flex min-h-screen bg-gray-800'>
        <SideBar/>
        <div className='flex flex-1 flex-col'>
          <Header onSearch={setSearchTerm}/>
          <div className='flex flex-1'>
            <main className='flex-1 p-4'>
              <StoreGrid search={searchTerm}/>
            </main>
          </div>
        </div>
        {isComprador && <CartIcon onClick={() => setCartOpen(true)} />}
        {isComprador && <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />}
      </div>
    </>
  )
}
