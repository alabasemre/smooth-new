import { useParams } from 'react-router-dom';

import styles from './Project.module.css';
import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';

const data = [
    { id: 'pano', name: 'Pano' },
    { id: 'sprint', name: 'Sprint' },
];

function Project() {
    const params = useParams();
    return (
        <div className={styles['project-outer-container']}>
            <NestedSidebar data={data}>
                <div className={styles['page-header']}>
                    <h1>Proje {params.projectId}</h1>
                </div>
            </NestedSidebar>
        </div>
    );
}

export default Project;
