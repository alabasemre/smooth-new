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

    const { data, isFetching, error } = useGetUserRoleQuery({
        teamId: teamId,
        token: userInfo.token,
    });

    const [activeTab, setActiveTab] = useState('team-members');
    const checkAdminRole = data?.role === 'owner' || data?.role === 'admin';

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    console.log('te:', data);

    useEffect(() => {
        if (!isFetching && data.message) {
            console.log('first');
            navigate('/dashboard/teams/');
        }
    }, [isFetching, navigate]);

    const renderTabMenu = () => (
        <div className={styles['tab-menu-container']}>
            {checkAdminRole && (
                <button onClick={() => changeTab('add-member')}>
                    Takıma Ekle
                </button>
            )}

            <button onClick={() => changeTab('team-members')}>
                Takım Arkadaşları
            </button>
            <button onClick={() => changeTab('projects')}>Projeler</button>
            {checkAdminRole && (
                <button onClick={() => changeTab('settings')}>Ayarlar</button>
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
                return <TeamSettings />;
            default:
                return activeTab;
        }
    };

    return (
        <section className={styles['section-container']}>
            {isFetching || (
                <>
                    <div className={styles['tab-container']}>
                        <h1>{data?.teamName}</h1>
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
