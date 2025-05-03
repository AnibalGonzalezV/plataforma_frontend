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
  roles: Role[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  const checkAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        const isTokenValid = decodedToken?.exp * 1000 > Date.now();
        if (!isTokenValid) {
          localStorage.clear();
          navigate('/');
        } else {
          setRoles(decodedToken.roles || []);
        }
      } catch (e) {
        localStorage.clear();
        navigate('/');
      }
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ loading, logout, checkAuth, roles }}>
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
