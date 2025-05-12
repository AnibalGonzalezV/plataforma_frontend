
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

export type StoreResponse = Store[];

export async function storeList(): Promise<StoreResponse> {
    const res = await fetch('http://localhost:3002/stores/all', {
        method: 'GET'
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}