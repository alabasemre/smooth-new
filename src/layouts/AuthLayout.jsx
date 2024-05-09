import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // TODO: if user is already logged in redirect to dashboard
    return <>{isUserLoggedIn ? <div>AuthLayout</div> : <Outlet />}</>;
}

export default AuthLayout;
