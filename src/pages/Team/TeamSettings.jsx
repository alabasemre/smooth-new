/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './Team.module.css';

function TeamSettings({ data, role }) {
    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description);

    return (
        <section className={styles['team_settings']}>
            <div className={styles['team_settings-input-group']}>
                <label htmlFor='name'>Takım Adı</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>

            <div className={styles['team_settings-input-group']}>
                <label htmlFor='description'>Takım Açıklaması</label>
                <textarea
                    type='text'
                    name='description'
                    id='description'
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </div>
            <div className={styles['team_settings-actions']}>
                <button className={styles['team_settings-actions-update']}>
                    Takımı Güncelle
                </button>
                {role === 'owner' && (
                    <button className={styles['team_settings-actions-delete']}>
                        Takımı Sil
                    </button>
                )}
            </div>
        </section>
    );
}

export default TeamSettings;
