import { Link } from 'react-router-dom';
import styles from './Projects.module.css';

const mock = [
    {
        id: 1,
        name: 'Lorem ipsum dolor',
        memberCount: 30,
        isActive: true,
        sprintCount: 3,
        startDate: '2015-01-01',
        owner: true,
        endDate: '',
        issueCount: 29,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
    },
    {
        id: 2,
        name: 'Amet Consectetur Adipisicing',
        memberCount: 36,
        isActive: false,
        sprintCount: 0,
        startDate: '2015-01-01',
        owner: false,
        endDate: '2020-02-04',
        issueCount: 0,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
    },
];

function Projects() {
    return (
        <section className={styles['projects']}>
            <div className={styles['page-header']}>
                <h1>Proje Listesi</h1>
                <button className={styles['new-project-button']}>
                    Yeni Proje Oluştur
                </button>
            </div>

            <div className={styles['projects-container']}>
                {mock.map((project) => (
                    <Link key={project.id} to={`project/${project.id}`}>
                        <div className={styles['project-container']}>
                            <p className={styles['project-name']}>
                                {project.name}
                            </p>
                            <div className={styles['project-info']}>
                                <p className={styles['badge-container']}>
                                    {project.isActive ? 'Aktif' : 'Pasif'}
                                </p>
                                <p className={styles['badge-container']}>
                                    {project.memberCount} Üye
                                </p>
                                <p className={styles['badge-container']}>
                                    {project.sprintCount} Aktif Sprint
                                </p>
                                <p className={styles['badge-container']}>
                                    {project.issueCount} Aktif Sorun
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log('first');
                                    }}
                                    className={styles['badge-container']}
                                    style={{
                                        background: 'red',
                                        border: 'none',
                                    }}
                                >
                                    Ayarlar
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Projects;
