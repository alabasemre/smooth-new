import { useState } from 'react';
import styles from './Forms.module.css';
import { useAddUserToTeamMutation } from '../../store/apis/teamApi';

function AddTeamMemberForm({ teamId, token }) {
    const [userMail, setUserMail] = useState('');
    const [addUserToTeam, results] = useAddUserToTeamMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userMail.trim().length === 0) {
            console.log('Email is empty');
            return;
        }

        await addUserToTeam({
            body: { email: userMail, teamId },
            token: token,
        }).then(() => {
            setUserMail('');
        });
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
