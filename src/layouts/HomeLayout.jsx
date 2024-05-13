import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function AuthLayout() {
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return <>{isUserLoggedIn ? <Navigate to='/dashboard' /> : <Outlet />}</>;
}

export default AuthLayout;
