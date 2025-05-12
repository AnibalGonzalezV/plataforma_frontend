import { useState, useEffect } from 'react';
import { StoreCard } from '@/components/vendorsComponents/StoreCard';
import type { StoreCardProps } from '@/components/vendorsComponents/StoreCard';
import { storeList } from '@/services/stores';

interface StoreGridProps {
  search: string;
}

export function StoreGrid({ search }: StoreGridProps) {
    const [storeItems, setStoreItems] = useState<StoreCardProps[]>([]);

    useEffect(() => {
    async function fetchStores() {
      try {
        const stores = await storeList();

        const formatted: StoreCardProps[] = stores.map(store => ({
          id: store.id,
          image: "",
          storeName: store.name,
          score: parseFloat(store.score),
        }));

        setStoreItems(formatted);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }

    fetchStores();
  }, []);

    const filteredStores = storeItems.filter(store =>
    store.storeName.toLowerCase().includes(search.toLowerCase())
    );

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