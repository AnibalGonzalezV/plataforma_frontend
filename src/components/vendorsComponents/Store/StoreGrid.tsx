import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { storeList } from '@/services/stores';
import { useAuthStore } from '@/store/AuthStore';
import { StoreCard, StoreCardProps } from '@/components/vendorsComponents/Store/StoreCard';
import PaginationFooter from '@/components/Pagination';

interface StoreGridProps {
  search: string;
  filterByOwner?: boolean;
}

export default function StoreGrid({ search, filterByOwner = false }: StoreGridProps) {
  const id = useAuthStore(state => state.id);

  const { data: stores = [], isLoading, isError } = useQuery({
    queryKey: ['stores'],
    queryFn: storeList
  });
    
  const filteredByOwner = filterByOwner && id !== -1
  ? stores.filter(store => store.owner.id === id)
  : stores;

  const formattedStores: StoreCardProps[] = filteredByOwner.map(store => ({
    id: store.id,
    image: "",
    storeName: store.name,
    score: parseFloat(store.score),
    roleContext: filterByOwner ? 'vendor' : 'client',
  }));

  const filteredStores = formattedStores.filter(store => 
    store.storeName.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
    
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStores.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) return <div>Cargando tiendas...</div>;
  if (isError) return <div>Error cargando tiendas.</div>;

    return (
    <div className='flex flex-col h-full'>
      <div className='grid grid-cols-4 gap-4 auto-rows-max flex-grow overflow-auto'>
        {currentItems.map((item, index) => (
          <StoreCard key={index} {...item} />
        ))}
      </div>
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </div>
  );
} 