export type LoginResponse = {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        roles: string[];
    };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Login failed');
        
    }
    
    return res.json();
}