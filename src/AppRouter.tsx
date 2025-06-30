import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoleProtectedRoute from '@/store/ProtectedRoute';

import Login from '@/components/Login';
import Register from '@/components/Register';
import LoadingScreen from '@/components/LoadingScreen';
import NotFound from '@/components/NotFound';
import Unauthorized from '@/components/Unauthorized';
import UserSettings from '@/components/UserSettings';
import UserProfile from '@/components/UserProfile';
import OrdersList from '@/components/usersComponents/OrdersList';
import VendorOrdersList from '@/components/vendorsComponents/VendorOrdersList';
import CourierOrdersList from '@/components/couriersComponents/CourierOrdersList';
import AdminDashboard from '@/components/adminComponents/AdminDashboard';
import CheckoutPayment from '@/components/usersComponents/CheckoutPayment';

const Home = lazy(() => import('@/components/usersComponents/Home'));

const CourierHome = lazy(() => import('@/components/couriersComponents/CourierHome'));

const AdminHome = lazy(() => import('@/components/adminComponents/AdminHome'));
const UserManagement = lazy(() => import('@/components/adminComponents/UsersManage/UserManagement'));

const VendorHome = lazy(() => import('@/components/vendorsComponents/VendorHome'));
const VendorDashboard = lazy(() => import('@/components/vendorsComponents/VendorDashboard'));
const VendorProducts = lazy(() => import('@/components/vendorsComponents/Store/StoreProducts'));
const VendorStoreView = lazy(() => import('@/components/vendorsComponents/VendorStoreView'));
const VendorManagement = lazy(() => import('@/components/vendorsComponents/StoreManagement'));

export default function AppRouter () {

    return (
        <Router>
            <Suspense fallback={<LoadingScreen/>}>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/unauthorized' element={<Unauthorized/>}/>
                    <Route path="*" element={<NotFound/>} />
                        
                    <Route element={<RoleProtectedRoute allowedRoles={['comprador']}/>}>
                        <Route path='/tiendas' element={<Home/>}/>
                        <Route path='/tiendas/:storeId' element={<VendorProducts/>}/>
                        <Route path='/pedidos' element={<OrdersList/>}/>
                        <Route path='/pago' element={<CheckoutPayment/>}/>
                    </Route>
                    <Route element={<RoleProtectedRoute allowedRoles={['vendedor']}/>}>
                        <Route path='/vendor' element={<VendorHome/>}/>
                        <Route path='/vendor/dashboard' element={<VendorDashboard/>}/>
                        <Route path='/vendor/:storeId' element={<VendorStoreView />} />
                        <Route path='/vendor/managment' element={<VendorManagement/>} />
                        <Route path='/vendor/pedidos' element={<VendorOrdersList/>}/>
                    </Route>
                    <Route element={<RoleProtectedRoute allowedRoles={['repartidor']}/>}>
                        <Route path='/courier' element={<CourierHome/>}/>
                        <Route path='/courier/pedidos' element={<CourierOrdersList/>}/>
                    </Route>
                    <Route element={<RoleProtectedRoute allowedRoles={['administrador']}/>}>
                        <Route path='/admin' element={<AdminHome/>}/>
                        <Route path='/admin/users' element={<UserManagement/>}/>
                        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                    </Route>
                    <Route path='/configuracion' element={<UserSettings/>}/>
                    <Route path='/perfil' element={<UserProfile/>}/>
                </Routes>
            </Suspense>
        </Router>
    )
}