import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import RoleProtectedRoute from '@/context/ProtectedRoute';

import LoadingScreen from './components/LoadingScreen';

const Login = lazy(() => import('@/components/Login'));
const Register = lazy(() => import('@/components/Register'));
const Unauthorized = lazy(() => import('@/components/Unauthorized'));

const Home = lazy(() => import('@/components/usersComponents/Home'));
const CourierHome = lazy(() => import('@/components/couriersComponents/CourierHome'));
const AdminHome = lazy(() => import('@/components/adminComponents/AdminHome'));
const VendorHome = lazy(() => import('@/components/vendorsComponents/VendorHome'));

const AppRouter = () => {

    return (
        <Router>
            <AuthProvider>
                <Suspense fallback={<LoadingScreen/>}>
                    <Routes>
                        <Route path='/' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/unauthorized' element={<Unauthorized/>}/>
                        
                        <Route element={<RoleProtectedRoute allowedRoles={['comprador']}/>}>
                            <Route path='/home' element={<Home/>}/>
                        </Route>
                        <Route element={<RoleProtectedRoute allowedRoles={['vendedor']}/>}>
                            <Route path='/vendor' element={<VendorHome/>}/>
                        </Route>
                        <Route element={<RoleProtectedRoute allowedRoles={['repartidor']}/>}>
                            <Route path='/courier' element={<CourierHome/>}/>
                        </Route>
                        <Route element={<RoleProtectedRoute allowedRoles={['administrador']}/>}>
                            <Route path='/admin' element={<AdminHome/>}/>
                        </Route>
                    </Routes>
                </Suspense>
            </AuthProvider>
        </Router>
    )
}

export default AppRouter;