import { useEffect, useState } from 'react';
import styles from './Project.module.css';
import { useOutletContext } from 'react-router-dom';

function Settings() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const context = useOutletContext();

    useEffect(() => {
        setName(context.project.name);
        setDescription(context.project.description);
    }, []);

    return (
        <section className={styles['project_settings']}>
            <h1>{context.project.name} / Ayarlar</h1>
            <div className={styles['project_settings-input-group']}>
                <label htmlFor='name'>Proje Adı</label>
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

            <div className={styles['project_settings-input-group']}>
                <label htmlFor='description'>Proje Açıklaması</label>
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
            <div className={styles['project_settings-actions']}>
                <button className={styles['project_settings-actions-update']}>
                    Projeyi Güncelle
                </button>
                {(context.userRole === 'owner' ||
                    context.userRole === 'manager') && (
                    <button
                        className={styles['project_settings-actions-delete']}
                    >
                        Projeyi Sil
                    </button>
                )}
            </div>
        </section>
    );
}
export default Settings;
