/* eslint-disable react/prop-types */
import Smooth from '../Smooth/Smooth';
import { IoCloseOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './Forms.module.css';
import { useSelector } from 'react-redux';
import {
    useCreateSprintMutation,
    useUpdateSprintMutation,
} from '../../store/apis/projectApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AddSprintForm({ closeModal, projectId, sprintId, sprintData }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('insert');

    useEffect(() => {
        if (sprintId) {
            setMode('update');
            setTitle(sprintData.name);
            setDescription(sprintData.description);

            const d = sprintData.endDate.split('.');
            setDate(`${d[2]}-${d[1]}-${d[0]}`);
        }
    }, []);

    const { userInfo } = useSelector((s) => s.user);
    const [createSprint, resultAdd] = useCreateSprintMutation();
    const [updateSprint, resultUpdate] = useUpdateSprintMutation();

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

        if (mode === 'insert') {
            createSprint({
                body: {
                    projectId,
                    name: title,
                    description,
                    endDate: dueDate.toLocaleDateString(),
                },
                token: userInfo.token,
            })
                .then(() => {
                    toast.success('Sprint Projeye Eklendi');
                    closeModal();
                })
                .catch(() => {
                    toast.error('Sprint Eklenirken Bir Hata Oluştu');
                });
        } else {
            updateSprint({
                body: {
                    name: title,
                    description,
                    endDate: dueDate.toLocaleDateString(),
                },
                sprintId,
                token: userInfo.token,
            })
                .then(() => {
                    toast.success('Sprint Güncellendi');
                    closeModal();
                })
                .catch(() => {
                    toast.error('Sprint Güncellenirken Bir Hata Oluştu');
                });
        }
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
