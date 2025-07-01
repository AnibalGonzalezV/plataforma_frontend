import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from '@/store/AuthStore';

export type ItemProduct = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  img?: string;
};

export type OrderDto = {
  storeId: number;
  clientId: number;
  deliveryType: 'retiro_en_tienda' | 'delivery';
  totalAmount?: number;
  items: {
    productId: number;
    quantity: number;
  }[];
};

interface CartStore {
  storeId: number;
  deliveryType: 'retiro_en_tienda' | 'delivery';
  items: ItemProduct[];

  isOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  addItem: (item: ItemProduct, storeId: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: () => number;
  getOrderPayload: () => OrderDto;
  setActiveStore: (newStoreId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      storeId: -1,
      deliveryType: 'retiro_en_tienda',
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),

      addItem: (item, newStoreId) => {
        set((state) => {
          if (state.storeId !== -1 && state.storeId !== newStoreId) {
            return {
              items: [item],
              storeId: newStoreId,
              deliveryType: 'retiro_en_tienda'
            };
          }

          const existingItem = state.items.find(i => i.productId === item.productId);
          if (existingItem) {
            return {
              ...state,
              items: state.items.map(i =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return {
            ...state,
            items: [...state.items, item],
            storeId: newStoreId
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(i => i.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(i =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () =>
        set({ storeId: -1, items: [], deliveryType: 'retiro_en_tienda' }),

      totalAmount: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      getOrderPayload: () => {
        const clientId = useAuthStore.getState().id;

        if (clientId === -1) {
          throw new Error('Usuario no autenticado.');
        }

        if (get().storeId === -1) {
          throw new Error('Carrito sin tienda asociada.');
        }

        return {
          storeId: get().storeId,
          clientId,
          deliveryType: get().deliveryType,
          totalAmount: get().totalAmount(),
          items: get().items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        };
      },

      setActiveStore: (newStoreId: number) => {
        const currentStoreId = get().storeId;
        if (currentStoreId !== -1 && currentStoreId !== newStoreId) {
          set({
            items: [],
            storeId: newStoreId,
            deliveryType: 'retiro_en_tienda',
            isOpen: false,
          });
        } else if (currentStoreId === -1) {
          set({ storeId: newStoreId });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        storeId: state.storeId,
        deliveryType: state.deliveryType,
        items: state.items,
        isOpen: state.isOpen,
      }),
    }
  )
);
