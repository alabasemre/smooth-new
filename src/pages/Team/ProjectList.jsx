import { Link, useParams } from 'react-router-dom';
import styles from './Team.module.css';
import { useSelector } from 'react-redux';
import { useGetTeamProjectsQuery } from '../../store/apis/teamApi';

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
    const params = useParams();
    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching, error } = useGetTeamProjectsQuery({
        teamId: params.teamId,
        token: userInfo.token,
    });

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
                    {!isFetching &&
                        data?.map((project) => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>startDate</td>
                                <td>{project.endDate || 'Devam Ediyor'}</td>
                                <td>0</td>
                                <td>
                                    <Link
                                        to={`/dashboard/project/${project.id}`}
                                    >
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
