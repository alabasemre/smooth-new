import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function AuthLayout() {
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    return <>{isUserLoggedIn ? <Outlet /> : <Navigate to='/' />}</>;
}

export default AuthLayout;
