import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

import styles from './Dashboard.module.css';

function Dashboard() {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <div className={styles['sidebar-container']}>
                <Sidebar />
            </div>

            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    overflow: 'auto',
                    flexDirection: 'column',
                    flex: 1,
                    backgroundColor: '#FCFCFC',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;
