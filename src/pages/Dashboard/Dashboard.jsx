import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
                padding: 10,
                gap: 10,
            }}
        >
            <Sidebar />
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    overflow: 'auto',
                    flexDirection: 'column',
                    flex: 1,
                    padding: 10,
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;
