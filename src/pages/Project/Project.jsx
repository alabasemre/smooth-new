import { Outlet, useParams } from 'react-router-dom';

// import styles from './Project.module.css';

import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';

const data = [
    { id: 'kanban', name: 'Pano' },
    { id: 'sprints', name: 'Sprint' },
    { id: 'settings', name: 'Ayarlar' },
    { id: 'members', name: 'Üyeler' },
];

function Project() {
    const params = useParams();
    return (
        <div className='nested-outer-container'>
            <NestedSidebar data={data}>
                <div className='nested-page-header'>
                    <h1>Proje {params.projectId}</h1>
                </div>
            </NestedSidebar>
            <Outlet />
        </div>
    );
}

export default Project;
