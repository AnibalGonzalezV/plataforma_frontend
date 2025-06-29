import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/AuthStore';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

export default function RoleProtectedRoute ({ allowedRoles }: RoleProtectedRouteProps) {
  const { loading, checkAuth, roles } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  if (loading) {
    return <div>Verificando sesión...</div>;
  }

  const accessToken = localStorage.getItem('accessToken');
  const hasAccess = roles.some(role => allowedRoles.includes(role.name));

  if (!accessToken) {
    return <Navigate to='/' replace />;
  }

  if (!hasAccess) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <Outlet />;
};