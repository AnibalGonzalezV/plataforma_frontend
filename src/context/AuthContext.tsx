import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Role {
  id: number;
  name: string;
}

interface AuthContextType {
  loading: boolean;
  logout: () => void;
  checkAuth: () => void;
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  const checkAuth = () => {
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        const isTokenValid = decodedToken?.exp * 1000 > Date.now();
        if (!isTokenValid) {
          logout();
        } else {
          setId(decodedToken.sub);
          setName(decodedToken.name);
          setEmail(decodedToken.email);
          setRoles(decodedToken.roles || []);
        }
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.clear();
    setId(-1);
    setName('');
    setEmail('');
    setRoles([]);
    setLoading(false);
    navigate('/');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, logout, checkAuth, id, name, email, roles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
