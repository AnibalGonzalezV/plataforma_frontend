import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import RoleProtectedRoute from '@/context/ProtectedRoute';

import Login from '@/components/Login';
import Register from '@/components/Register';
import Unauthorized from '@/components/Unauthorized';
import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('@/components/usersComponents/Home'));

const CourierHome = lazy(() => import('@/components/couriersComponents/CourierHome'));

const AdminHome = lazy(() => import('@/components/adminComponents/AdminHome'));
const UserManagement = lazy(() => import('@/components/adminComponents/UsersManage/UserManagement'));

const VendorHome = lazy(() => import('@/components/vendorsComponents/VendorHome'));
const VendorProducts = lazy(() => import('@/components/vendorsComponents/Store/StoreProducts'));
const VendorStoreView = lazy(() => import('@/components/vendorsComponents/VendorStoreView'));

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
                            <Route path='/tiendas' element={<Home/>}/>
                            <Route path='/tiendas/:storeId' element={<VendorProducts/>}/>
                        </Route>
                        <Route element={<RoleProtectedRoute allowedRoles={['vendedor']}/>}>
                            <Route path='/vendor' element={<VendorHome/>}/>
                            <Route path='/vendor/:storeId' element={<VendorStoreView />} />
                        </Route>
                        <Route element={<RoleProtectedRoute allowedRoles={['repartidor']}/>}>
                            <Route path='/courier' element={<CourierHome/>}/>
                        </Route>
                        <Route element={<RoleProtectedRoute allowedRoles={['administrador']}/>}>
                            <Route path='/admin' element={<AdminHome/>}/>
                            <Route path='/admin/users' element={<UserManagement/>}/>
                        </Route>
                    </Routes>
                </Suspense>
            </AuthProvider>
        </Router>
    )
}

export default AppRouter;