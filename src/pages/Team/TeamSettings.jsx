import styles from './Team.module.css';

function TeamSettings() {
    return (
        <div>
            <div className={styles['team_settings-input-group']}>
                <label htmlFor='name'>Takım Adı</label>
                <input type='text' name='name' id='name' />
            </div>

            <div className={styles['team_settings-input-group']}>
                <label htmlFor='description'>Takım Açıklaması</label>
                <input type='text' name='description' id='description' />
            </div>

            <button>Takımı Sil</button>
        </div>
    );
}

export default TeamSettings;
