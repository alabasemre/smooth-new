import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Team.module.css';

function Team() {
    const params = useParams();

    const [activeTab, setActiveTab] = useState('team-members');

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <section className={styles['section-container']}>
            <div className={styles['tab-container']}>
                <h1>Team Marvel</h1>
                <div className={styles['tab-menu-container']}>
                    <button onClick={() => changeTab('add-member')}>
                        Takıma Ekle
                    </button>
                    <button onClick={() => changeTab('team-members')}>
                        Takım Arkadaşları
                    </button>
                    <button onClick={() => changeTab('projects')}>
                        Projeler
                    </button>
                    <button onClick={() => changeTab('settings')}>
                        Ayarlar
                    </button>
                </div>
            </div>
            <div className={styles['tab-content']}>{activeTab}</div>
        </section>
    );
}

export default Team;
