
export type Owner = {
  id: number;
  email: string;
  password: string;
  names: string;
  lastNames: string;
  address: string;
  phoneNumber: number;
  isActive: boolean;
  registrationDate: string;
};

export type Store = {
  id: number;
  name: string;
  address: string;
  score: string;
  owner: Owner;
};

export type Category = {
  categoryId: number;
  storeId: number;
  name: string
};

export type Tag = {
  tagId: number;
  name: string;
};

export type Product = {
  productId: number;
  img: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: Category;
  tags: Tag[];
};

export type StoreResponse = Store[];
export type ProductsResponse = Product[];

export async function storeList(): Promise<StoreResponse> {
    const res = await fetch('http://localhost:3003/users/stores/all', {
        method: 'GET'
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    const data: StoreResponse = await res.json();
    return data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
}

export async function storeById(id: number): Promise<Store> {
    const res = await fetch(`http://localhost:3003/users/stores/${id}`, {
        method: 'GET'
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}

export async function productsByStore(id: number): Promise<ProductsResponse> {
    const res = await fetch(`http://localhost:3003/products/products/store/${id}`, {
        method: 'GET'
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}