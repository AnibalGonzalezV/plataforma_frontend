export type RegisterResponse = {
    email: string;
    password: string;
    names: string;
    lastNames: string;
    address: string;
    phoneNumber: string;
    isActive: boolean;
    registrationDate: string;
    roles: string[];
    id: string;
};

export async function register(email: string, password: string, names: string, lastNames: string, address: string, phoneNumber: string): Promise<RegisterResponse> {
    const res = await fetch('http://localhost:3002/usuarios/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, names, lastNames, address, phoneNumber }),
    });
    if (res.status != 201) {
        const error = await res.json();
        throw new Error(error.message || 'Register failed');
        
    }
    
    return res.json();
}