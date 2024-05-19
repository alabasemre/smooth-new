import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Team.module.css';
import AddTeamMemberForm from '../../components/Forms/AddTeamMemberForm';
import TeamMembers from './TeamMembers';
import ProjectList from './ProjectList';
import TeamSettings from './TeamSettings';

function Team() {
    const params = useParams();

    const [activeTab, setActiveTab] = useState('team-members');

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    const renderTabMenu = () => (
        <div className={styles['tab-menu-container']}>
            <button onClick={() => changeTab('add-member')}>Takıma Ekle</button>
            <button onClick={() => changeTab('team-members')}>
                Takım Arkadaşları
            </button>
            <button onClick={() => changeTab('projects')}>Projeler</button>
            <button onClick={() => changeTab('settings')}>Ayarlar</button>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'add-member':
                return <AddTeamMemberForm />;
            case 'team-members':
                return <TeamMembers />;
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
            <div className={styles['tab-container']}>
                <h1>Team Marvel {params.teamId}</h1>
                {renderTabMenu()}
            </div>
            <div className={styles['tab-content']}>{renderTabContent()}</div>
        </section>
    );
}

export default Team;
