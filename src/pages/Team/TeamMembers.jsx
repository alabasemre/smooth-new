import styles from './Team.module.css';

const appUsers = [
    {
        id: 1,
        name: 'Emre',
        surname: 'Alabaş',
        email: 'emre@mail.com',
        title: 'Front End Developer',
    },
    {
        id: 2,
        name: 'Ahsen',
        surname: 'Bilgili',
        email: 'ahsen@mail.com',
        title: 'Back End Developer',
    },
    {
        id: 3,
        name: 'Oğuz',
        surname: 'Doğan',
        email: 'oguz@mail.com',
        title: 'Back End Developer',
    },
];

function TeamMembers() {
    return (
        <div className={styles['team_members-container']}>
            <table className={styles['team_members-table']}>
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>E-Posta</th>
                        <th>Ünvan</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {appUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.title}</td>
                            <td>
                                <button
                                    className={
                                        styles['team_members-table-actions']
                                    }
                                >
                                    Düzenle
                                </button>
                                <button
                                    className={
                                        styles['team_members-table-actions']
                                    }
                                >
                                    Takımdan Çıkar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamMembers;
