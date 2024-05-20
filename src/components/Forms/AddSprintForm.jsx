/* eslint-disable react/prop-types */
import Smooth from '../Smooth/Smooth';
import { IoCloseOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './Forms.module.css';

function AddSprintForm({ closeModal, projectId, sprintId }) {
    // TODO: Sprint id varsa güncelleme yapılacak yoksa ekleme ikisi de bu form üzerinde

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

            <form className={styles['add_sprint-form']}>
                <div className={styles['add_sprint-input-group']}>
                    <label
                        className={styles['add_sprint-label']}
                        htmlFor='name'
                    >
                        Sprint Başlığı
                    </label>
                    <input type='text' id='name' name='name' />
                </div>
                <div className={styles['add_sprint-input-group']}>
                    <label
                        className={styles['add_sprint-label']}
                        htmlFor='name'
                    >
                        Açıklama
                    </label>
                    <textarea />
                </div>

                <div className={styles['date_picker-input-group']}>
                    <label htmlFor='datePicker'>Bitiş Tarihi:</label>
                    <input type='date' id='datePicker' />
                </div>

                <button className={styles['add_sprint-btn']}>
                    {sprintId ? 'Güncelle' : '  Sprinti Ekle'}
                </button>
            </form>
        </div>
    );
}

export default AddSprintForm;
