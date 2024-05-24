/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import styles from './Forms.module.css';
import Smooth from '../Smooth/Smooth';
import { IoCloseOutline } from 'react-icons/io5';

const roles = [
    {
        id: '1',
        text: 'Yönetici',
    },
    {
        id: '2',
        text: 'Proje Yöneticisi',
    },
    {
        id: '3',
        text: 'Üye',
    },
];

function EditTeamUserForm({ user, teamId, closeModal }) {
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(roles[0]);

    const onSubmit = () => {
        // TODO: UPDATE USER ROLE
        closeModal();
    };

    return (
        <div className={styles['edit_team_user']}>
            <div className={styles['header']}>
                <div>
                    <Smooth />
                </div>
                <span className={styles['header-button']}>
                    <IoCloseOutline size={20} onClick={closeModal} />
                </span>
            </div>
            <h3>Kullanıcı Rolünü Güncelle</h3>
            <div className={styles['edit_team_user-container']}>
                <span>
                    Kullanıcı: {user.name} {user.surname}{' '}
                </span>
                <div className={styles['edit_team_user-dropdown-container']}>
                    <span>Rol: </span>
                    <p onClick={() => setOpen((s) => !s)}>
                        {selectedRole.text}{' '}
                        {open ? <FaArrowUp /> : <FaArrowDown />}
                    </p>
                    {open && (
                        <div className={styles['edit_team_user-dropdown']}>
                            {roles.map((role) => {
                                if (role.id !== selectedRole.id) {
                                    return (
                                        <div
                                            key={role.id}
                                            className={
                                                styles[
                                                    'edit_team_user-dropdown-item'
                                                ]
                                            }
                                            onClick={() => {
                                                setSelectedRole(role);
                                                setOpen(false);
                                            }}
                                        >
                                            {role.text}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>{' '}
            <button className={styles['edit_team_user-btn']} onClick={onSubmit}>
                Rolü Güncelle
            </button>
        </div>
    );
}

export default EditTeamUserForm;
