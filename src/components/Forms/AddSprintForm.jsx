/* eslint-disable react/prop-types */
import Smooth from '../Smooth/Smooth';
import { IoCloseOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './Forms.module.css';
import { useSelector } from 'react-redux';
import { useCreateSprintMutation } from '../../store/apis/projectApi';
import { useState } from 'react';

function AddSprintForm({ closeModal, projectId, sprintId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const { userInfo } = useSelector((s) => s.user);
    const [createSprint, results] = useCreateSprintMutation();

    const onSubmit = (e) => {
        e.preventDefault();
        if (title.trim().length === 0) {
            console.log('Title is required');
            return;
        }

        if (date === '') {
            console.log('Date is required');
            return;
        }
        const today = new Date().getTime();
        const dueDate = new Date(date);
        if (dueDate.getTime() < today) {
            console.log('Check your due date');
            return;
        }

        createSprint({
            body: {
                projectId,
                name: title,
                description,
                endDate: dueDate.toLocaleString().split(' ')[0],
            },
            token: userInfo.token,
        }).then(() => {
            closeModal();
        });
    };

    return (
        <div className={styles['add_sprint-container']}>
            <div className={styles['header']}>
                <div>
                    <Smooth /> Bir Sprint Ekleyin
                </div>
                <div className={styles['add_sprint-header-actions']}>
                    {sprintId && (
                        <span className={styles['header-button']}>
                            <MdDeleteOutline size={20} onClick={closeModal} />
                        </span>
                    )}

                    <span className={styles['header-button']}>
                        <IoCloseOutline size={20} onClick={closeModal} />
                    </span>
                </div>
            </div>

            <form className={styles['add_sprint-form']} onSubmit={onSubmit}>
                <div className={styles['add_sprint-input-group']}>
                    <label
                        className={styles['add_sprint-label']}
                        htmlFor='name'
                    >
                        Sprint Başlığı
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles['add_sprint-input-group']}>
                    <label
                        className={styles['add_sprint-label']}
                        htmlFor='name'
                    >
                        Açıklama
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className={styles['date_picker-input-group']}>
                    <label htmlFor='datePicker'>Bitiş Tarihi:</label>
                    <input
                        type='date'
                        id='datePicker'
                        onChange={(e) => setDate(e.target.valueAsDate)}
                    />
                </div>

                <button className={styles['add_sprint-btn']}>
                    {sprintId ? 'Güncelle' : '  Sprinti Ekle'}
                </button>
            </form>
        </div>
    );
}

export default AddSprintForm;
