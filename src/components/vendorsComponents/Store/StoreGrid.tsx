import { useState, useEffect } from 'react';
import { StoreCard } from '@/components/vendorsComponents/Store/StoreCard';
import type { StoreCardProps } from '@/components/vendorsComponents/Store/StoreCard';
import { storeList } from '@/services/stores';
import { useAuth } from '@/context/AuthContext';

interface StoreGridProps {
  search: string;
  filterByOwner?: boolean;
}

export function StoreGrid({ search, filterByOwner = false }: StoreGridProps) {
    const [storeItems, setStoreItems] = useState<StoreCardProps[]>([]);
    const { id } = useAuth();

    useEffect(() => {
    async function loadStores() {
      try {
        const stores = await storeList();

        const filteredStores = filterByOwner && id !== -1
          ? stores.filter(store => store.owner.id === id)
          : stores;

        const formatted: StoreCardProps[] = filteredStores.map(store => ({
          id: store.id,
          image: "",
          storeName: store.name,
          score: parseFloat(store.score),
          roleContext: filterByOwner ? 'vendor' : 'client'
        }));

        setStoreItems(formatted);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }

    loadStores();
  }, []);

    const filteredStores = storeItems.filter(store => store.storeName.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {filteredStores.map((item, index) => (
                    <StoreCard key={index} {...item} />
                ))}
            </div>
        </>
    )
}