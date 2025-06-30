
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
  imageUrl?: string
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

export async function createStore(userId: number, name: string, address: string, score: number): Promise<Store> {
    const res = await fetch('http://localhost:3003/users/stores/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, name, address, score }),
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}

export async function createTag(name: string) {
  const res = await fetch('http://localhost:3003/products/tags/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}

export async function createCategory(name: string): Promise<Tag> {
  const res = await fetch('http://localhost:3003/products/categories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}

export async function createProduct(storeId: number, name: string, description: string, quantity: number,
  price: number, categoryId: number, tags: Tag[]
): Promise<Tag> {
  const res = await fetch('http://localhost:3003/products/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId, name, description, quantity, price, categoryId, tags }),
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}