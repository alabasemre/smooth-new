/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IoCloseOutline } from 'react-icons/io5';

import Input from '../Input/Input';
import Smooth from '../Smooth/Smooth';

import styles from './Forms.module.css';
import { useCreateTeamMutation } from '../../store/apis/teamApi';
import { useSelector } from 'react-redux';

function NewTeamForm({ toggleModal }) {
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [createTeam, results] = useCreateTeamMutation();
    const { userInfo } = useSelector((s) => s.user);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (teamName.trim() === '') {
            console.log('Error takım adı boş');
            return;
        }

        createTeam({
            body: { name: teamName, description: teamDescription },
            token: userInfo.token,
        })
            .then(() => {
                toast.success('Takım Başarıyla Oluşturuldu');
                toggleModal();
            })
            .catch(() => {
                toast.error('Takım Eklenirken Bir Hata Oluştu');
            });
    };

    return (
        <div className={styles['form-container']}>
            <div className={styles['header']}>
                <div>
                    <Smooth /> Bir Takım Oluşturun
                </div>
                <span className={styles['header-button']}>
                    <IoCloseOutline size={20} onClick={toggleModal} />
                </span>
            </div>

            <form className={styles['form']} onSubmit={onSubmit}>
                <Input
                    id='teamName'
                    name='teamName'
                    label='Takım Adı'
                    type='text'
                    value={teamName}
                    onChange={setTeamName}
                ></Input>

                <label htmlFor='description'>Bu Takım Ne Yapıyor</label>
                <textarea
                    name='description'
                    id='description'
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    className={styles['project-description']}
                ></textarea>

                <button
                    className={styles['btn-add']}
                    disabled={results.isLoading}
                >
                    Takımı Oluştur
                </button>
            </form>
        </div>
    );
}

export default NewTeamForm;
