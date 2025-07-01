import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoleProtectedRoute from '@/store/ProtectedRoute';

import Login from '@/components/Login';
import Register from '@/components/Register';
import LoadingScreen from '@/components/LoadingScreen';
import NotFound from '@/components/NotFound';
import Unauthorized from '@/components/Unauthorized';

const Home = lazy(() => import('@/components/usersComponents/Home'));
const UserSettings = lazy(() => import('@/components/usersComponents/UserSettings'));
const UserProfile = lazy(() => import('@/components/usersComponents/UserProfile'));
const OrdersList = lazy(() => import('@/components/usersComponents/OrdersList'));
const CheckoutPayment = lazy(() => import('@/components/usersComponents/CheckoutPayment'));

const CourierHome = lazy(() => import('@/components/couriersComponents/CourierHome'));
const CourierOrdersList = lazy(() => import('@/components/couriersComponents/CourierOrdersList'));

const AdminHome = lazy(() => import('@/components/adminComponents/AdminHome'));
const UserManagement = lazy(() => import('@/components/adminComponents/UsersManage/UserManagement'));
const AdminDashboard = lazy(() => import('@/components/adminComponents/AdminDashboard'));

const VendorDashboard = lazy(() => import('@/components/vendorsComponents/VendorDashboard'));
const VendorProducts = lazy(() => import('@/components/vendorsComponents/StoreComponents/StoreProducts'));
const VendorStoreView = lazy(() => import('@/components/vendorsComponents/VendorStoreView'));
const VendorManagement = lazy(() => import('@/components/vendorsComponents/StoreManagement'));
const VendorOrdersList = lazy(() => import('@/components/vendorsComponents/VendorOrdersList'));

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
                        <Route path='/configuracion' element={<UserSettings/>}/>
                        <Route path='/perfil' element={<UserProfile/>}/>
                    </Route>
                    <Route element={<RoleProtectedRoute allowedRoles={['vendedor']}/>}>
                        <Route path='/vendor/managment' element={<VendorManagement/>} />
                        <Route path='/vendor/dashboard' element={<VendorDashboard/>}/>
                        <Route path='/vendor/:storeId' element={<VendorStoreView />} />
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
                </Routes>
            </Suspense>
        </Router>
    )
}