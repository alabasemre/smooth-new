/* eslint-disable react/prop-types */
import { useState } from 'react';
import AddProjectMemberForm from '../../components/Forms/AddProjectMemberForm';
import styles from './Project.module.css';
import { useOutletContext, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProjectUsersQuery } from '../../store/apis/projectApi';

function Members() {
    const [activeTab, setActiveTab] = useState('team-members');
    const params = useParams();

    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching } = useGetProjectUsersQuery({
        projectId: params.projectId,
        token: userInfo.token,
    });

    const context = useOutletContext();
    const isAdmin =
        context.userRole === 'admin' ||
        context.userRole === 'owner' ||
        context.userRole === 'manager';

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    const renderTabMenu = () => (
        <div className={styles['project_members-tab-menu-container']}>
            {isAdmin && (
                <button
                    onClick={() => changeTab('add-member')}
                    className={
                        activeTab === 'add-member'
                            ? styles['tab-menu-active']
                            : ''
                    }
                >
                    Projeye Ekle
                </button>
            )}

            <button
                onClick={() => changeTab('team-members')}
                className={
                    activeTab === 'team-members'
                        ? styles['tab-menu-active']
                        : ''
                }
            >
                Proje Arkadaşları
            </button>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'add-member':
                return <AddProjectMemberForm />;
            case 'team-members':
                return <MembersTable data={data} isAdmin={isAdmin} />;
            default:
                return activeTab;
        }
    };

    return (
        <section className={styles['project_members-section-container']}>
            <div className={styles['project_members-tab-container']}>
                <h1>{context.project.name}</h1>
                {renderTabMenu()}
            </div>
            <div className={styles['project_members-tab-content']}>
                {isFetching || renderTabContent()}
            </div>
        </section>
    );
}

function MembersTable({ data, isAdmin }) {
    return (
        <div className={styles['project_members-container']}>
            <table className={styles['project_members-table']}>
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>E-Posta</th>
                        <th>Rol</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {isAdmin && (
                                    <button
                                        className={
                                            styles[
                                                'project_members-table-actions'
                                            ]
                                        }
                                    >
                                        Projeden Çıkar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Members;
