/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Team.module.css';
import AddTeamMemberForm from '../../components/Forms/AddTeamMemberForm';
import TeamMembers from './TeamMembers';
import ProjectList from './ProjectList';
import TeamSettings from './TeamSettings';
import { useSelector } from 'react-redux';
import { useGetUserRoleQuery } from '../../store/apis/teamApi';

function Team() {
    const params = useParams();
    const navigate = useNavigate();
    const { userInfo } = useSelector((s) => s.user);
    const { teamId } = params;

    const { data, isFetching } = useGetUserRoleQuery({
        teamId: teamId,
        token: userInfo.token,
    });

    const [activeTab, setActiveTab] = useState('team-members');
    const checkAdminRole = data?.role === 'owner' || data?.role === 'admin';

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        if (!isFetching && data.message) {
            navigate('/dashboard/teams/');
        }
    }, [isFetching, navigate]);

    const renderTabMenu = () => (
        <div className={styles['tab-menu-container']}>
            {checkAdminRole && (
                <button
                    onClick={() => changeTab('add-member')}
                    className={
                        activeTab === 'add-member'
                            ? styles['tab-menu-active']
                            : ''
                    }
                >
                    Takıma Ekle
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
                Takım Arkadaşları
            </button>
            <button
                onClick={() => changeTab('projects')}
                className={
                    activeTab === 'projects' ? styles['tab-menu-active'] : ''
                }
            >
                Projeler
            </button>
            {checkAdminRole && (
                <button
                    onClick={() => changeTab('settings')}
                    className={
                        activeTab === 'settings'
                            ? styles['tab-menu-active']
                            : ''
                    }
                >
                    Ayarlar
                </button>
            )}
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'add-member':
                return (
                    <AddTeamMemberForm teamId={teamId} token={userInfo.token} />
                );
            case 'team-members':
                return <TeamMembers isAdmin={checkAdminRole} />;
            case 'projects':
                return <ProjectList />;
            case 'settings':
                return <TeamSettings data={data?.teamData} role={data?.role} />;
            default:
                return activeTab;
        }
    };

    return (
        <section className={styles['section-container']}>
            {isFetching || (
                <>
                    <div className={styles['tab-container']}>
                        <h1>{data?.teamData?.name}</h1>
                        {renderTabMenu()}
                    </div>
                    <div className={styles['tab-content']}>
                        {renderTabContent()}
                    </div>
                </>
            )}
        </section>
    );
}

export default Team;
