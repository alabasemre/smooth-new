import { Outlet, useParams } from 'react-router-dom';

// import styles from './Project.module.css';

import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';
import { useGetProjectUserRoleQuery } from '../../store/apis/projectApi';
import { useSelector } from 'react-redux';

const menuData = [
    { id: 'kanban', name: 'Pano' },
    { id: 'sprints', name: 'Sprint' },
    { id: 'settings', name: 'Ayarlar' },
    { id: 'members', name: 'Üyeler' },
];

function Project() {
    const params = useParams();
    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching, error } = useGetProjectUserRoleQuery({
        projectId: params.projectId,
        token: userInfo.token,
    });

    return (
        <div className='nested-outer-container'>
            <NestedSidebar data={menuData}>
                <div className='nested-page-header'>
                    <h1>{isFetching || data?.project.name}</h1>
                </div>
            </NestedSidebar>
            {isFetching || (
                <Outlet
                    context={{
                        project: data.project,
                        userRole: data.role,
                    }}
                />
            )}
        </div>
    );
}

export default Project;
