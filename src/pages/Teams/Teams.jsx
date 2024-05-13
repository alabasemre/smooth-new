import { Link, useParams } from 'react-router-dom';
import styles from './Teams.module.css';

const teams = [
    {
        id: 1,
        name: 'Lorem ipsum dolor',
        memberCount: 30,
        isActive: true,
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
        startDate: '2015-01-01',
        owner: false,
        endDate: '2020-02-04',
        issueCount: 0,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
    },
];

function Teams() {
    const params = useParams();

    return (
        <section className={styles['teams']}>
            <div className={styles['teams-container']}>
                <div className={styles['page-header']}>
                    <h1>Takımlarınız</h1>
                    <button className={styles['new-team-button']}>
                        Yeni Takım Oluştur
                    </button>
                </div>
                {teams.map((team) => (
                    <Link to={`${team.id}`} key={team.id}>
                        <div className={styles['team-container']}>
                            <p className={styles['team-name']}>{team.name}</p>
                            <div className={styles['team-info']}>
                                <p className={styles['badge-container']}>
                                    {team.isActive ? 'Aktif' : 'Pasif'}
                                </p>
                                <p className={styles['badge-container']}>
                                    {team.memberCount} Üye
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className={styles['team-detail']}>
                <div className={styles['page-header']}>
                    <h1>Takım Detay</h1>
                    {params.id && <p>TAKIM ID: {params.teamId} </p>}
                </div>
            </div>
        </section>
    );
}

export default Teams;
