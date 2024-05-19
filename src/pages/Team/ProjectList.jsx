import { Link } from 'react-router-dom';
import styles from './Team.module.css';

const projects = [
    {
        id: '1',
        name: 'Project Alpha',
        startDate: '01-01-2015',
        endDate: '',
        memberCount: 35,
    },
    {
        id: '2',
        name: 'Project Zeta',
        startDate: '01-01-2015',
        endDate: '01-01-2019',
        memberCount: 0,
    },
];

function ProjectList() {
    return (
        <div className={styles['projects-container']}>
            <table className={styles['projects-table']}>
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Başlangıç Tarihi</th>
                        <th>Bitiş</th>
                        <th>Çalışan Sayısı</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.startDate}</td>
                            <td>{project.endDate || 'Devam Ediyor'}</td>
                            <td>{project.memberCount}</td>
                            <td>
                                <Link to={`/dashboard/project/${project.id}`}>
                                    <button
                                        className={
                                            styles['projects-table-actions']
                                        }
                                    >
                                        Proje Sayfasını Görüntüle
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectList;
