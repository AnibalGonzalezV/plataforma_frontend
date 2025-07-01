import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/AuthStore';
import LoadingScreen from '@/components/LoadingScreen';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

export default function RoleProtectedRoute ({ allowedRoles }: RoleProtectedRouteProps) {
  const loading = useAuthStore(state => state.loading);
  const checkAuth = useAuthStore(state => state.checkAuth);
  const roles = useAuthStore(state => state.roles);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  if (loading) {
    return <LoadingScreen />;
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