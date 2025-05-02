import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const { loading, checkAuth, roles } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <div>Verificando sesión...</div>;

  const hasAccess = roles.some(role => allowedRoles.includes(role.name));

  return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleProtectedRoute;