import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const { loading, checkAuth, roles } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  if (loading) return <div>Verificando sesión...</div>;

  const accessToken = localStorage.getItem('accessToken');
  const hasAccess = roles.some(role => allowedRoles.includes(role.name));

  if (!accessToken) { // Revisar en Backend la validación
    return <Navigate to="/" replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;