/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import Input from '../Input/Input';

import Smooth from '../Smooth/Smooth';

import styles from './Forms.module.css';

function NewTeamForm({ toggleModal }) {
    const [teamName, setTeamName] = useState('');
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

            <form className={styles['form']}>
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
                    className={styles['project-description']}
                ></textarea>

                <button className={styles['btn-add']}>Takımı Oluştur</button>
            </form>
        </div>
    );
}

export default NewTeamForm;
