import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AuthLayout from './layouts/AuthLayout';
import HomeLayout from './layouts/HomeLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Projects from './pages/Projects/Projects';
import Teams from './pages/Teams/Teams';
import Project from './pages/Project/Project';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <AuthLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: '',
                        element: <Projects />,
                    },
                    {
                        path: 'teams',
                        element: <Teams />,
                        children: [{ path: ':teamId', element: <Teams /> }],
                    },
                    {
                        path: 'project/:projectId',
                        element: <Project />,
                    },
                ],
            },
        ],
    },
]);

export { router };
