import { useState } from 'react';
import AddProjectMemberForm from '../../components/Forms/AddProjectMemberForm';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';

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

function Members() {
    const [activeTab, setActiveTab] = useState('team-members');
    const params = useParams();
    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    const renderTabMenu = () => (
        <div className={styles['project_members-tab-menu-container']}>
            <button onClick={() => changeTab('add-member')}>
                Projeye Ekle
            </button>
            <button onClick={() => changeTab('team-members')}>
                Proje Arkadaşları
            </button>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'add-member':
                return <AddProjectMemberForm />;
            case 'team-members':
                return <MembersTable />;
            default:
                return activeTab;
        }
    };

    return (
        <section className={styles['project_members-section-container']}>
            <div className={styles['project_members-tab-container']}>
                <h1>Proje {params.projectId}</h1>
                {renderTabMenu()}
            </div>
            <div className={styles['project_members-tab-content']}>
                {renderTabContent()}
            </div>
        </section>
    );
}

function MembersTable() {
    return (
        <div className={styles['project_members-container']}>
            <table className={styles['project_members-table']}>
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>E-Posta</th>
                        <th>Ünvan</th>
                        <th>Yetki Derecesi</th>
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
                            <td>{user.managerRole}</td>
                            <td>
                                <button
                                    className={
                                        styles['project_members-table-actions']
                                    }
                                >
                                    Projeden Çıkar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Members;
