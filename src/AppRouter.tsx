import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import RoleProtectedRoute from './context/ProtectedRoute';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/usersComponents/Home';
import CourierHome from './components/couriersComponents/CourierHome';
import AdminHome from './components/adminComponents/AdminHome';
import VendorHome from './components/vendorsComponents/VendorHome';

const AppRouter = () => {

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    
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
            </AuthProvider>
        </Router>
    )
}

export default AppRouter;