import { useState } from 'react';
import styles from './Forms.module.css';
import userImg from '../../assets/user.png';

const appUsers = [
    {
        id: 1,
        name: 'Emre',
        surname: 'Alabaş',
        email: 'emre@mail.com',
        title: 'Front End Developer',
        managerRole: 'Geliştirici',
    },
    {
        id: 2,
        name: 'Ahsen',
        surname: 'Bilgili',
        email: 'ahsen@mail.com',
        title: 'Back End Developer',
        managerRole: 'Yönetici',
    },
    {
        id: 3,
        name: 'Oğuz',
        surname: 'Doğan',
        email: 'oguz@mail.com',
        title: 'Back End Developer',
        managerRole: 'Geliştirici',
    },
];

function AddProjectMemberForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTeamUsers, setFilteredTeamUsers] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        const teamUsers = appUsers.filter((user) =>
            user.email.includes(searchTerm)
        );

        setFilteredTeamUsers(teamUsers);
    };

    return (
        <div>
            <form
                onSubmit={handleSearch}
                className={styles['add_project_member-form']}
            >
                <div className={styles['add_project_member-search']}>
                    <label htmlFor='email'>Takım Arkadaşını Aratın</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>Ara</button>
                </div>
            </form>

            {filteredTeamUsers.length > 0 ? (
                <>
                    <h3 style={{ marginBottom: 10 }}>Sonuçlar</h3>
                    {filteredTeamUsers.map((user) => (
                        <div
                            key={user.id}
                            className={styles['add_project_member-item']}
                        >
                            <div>
                                <img src={userImg} alt='' />
                                <p>
                                    {user.name} {user.surname}
                                </p>
                            </div>
                            <button>Ekle</button>
                        </div>
                    ))}
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default AddProjectMemberForm;
