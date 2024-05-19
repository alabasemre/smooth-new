import { useState } from 'react';
import styles from './Forms.module.css';

function AddTeamMemberForm() {
    const [userMail, setUserMail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>Kimi Eklemek İstiyorsunuz?</h1>
            <form
                className={styles['add_team_member-form']}
                onSubmit={handleSubmit}
            >
                <div className={styles['add_team_member-input-group']}>
                    <label htmlFor='search'>E-Posta Adresi</label>
                    <div>
                        <input
                            type='email'
                            id='search'
                            value={userMail}
                            onChange={(e) => {
                                setUserMail(e.target.value);
                            }}
                        />
                        <button className={styles['add_team_member-btn']}>
                            Ekle
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTeamMemberForm;
