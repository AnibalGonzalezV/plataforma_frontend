
export type User = {
  id: number;
  email: string;
  names: string;
  lastNames: string;
  address: string;
  phoneNumber: number;
  isActive: boolean;
  registrationDate: string;
};

export type Role = {
  id: number;
  name: string;
  users: number[];
};

export type UserData = {
  user: {
    id: number;
    names: string;
    lastNames: string;
    email: string;
    address: string;
  };
  onClose: () => void;
};

export type UserResponse = User[];

export async function userList(): Promise<UserResponse> {
    const res = await fetch('http://localhost:3003/users/usuarios/all', {
        method: 'GET'
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Response failed');
    }

    return await res.json();
}

export async function roleList(): Promise<Role[]> {
  const res = await fetch('http://localhost:3002/roles/all', {
    method: 'GET',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch roles');
  }

  return await res.json();
}

export async function updateUserRoles(userId: number, roleIds: number[]): Promise<void> {
  const res = await fetch(`http://localhost:3002/usuarios/${userId}/roles`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roleIds }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update roles');
  }
}
