/* eslint-disable react/prop-types */
import { IoCloseOutline } from 'react-icons/io5';
import Smooth from '../Smooth/Smooth';
import styles from './Forms.module.css';

function DatePickerForm({ closeModal, sprintId, projectId }) {
    return (
        <div className={styles['date_picker-container']}>
            <div className={styles['header']}>
                <div>
                    <Smooth />
                </div>
                <span className={styles['header-button']}>
                    <IoCloseOutline size={20} onClick={closeModal} />
                </span>
            </div>
            <form className={styles['date_picker-form']}>
                <div className={styles['date_picker-input-group']}>
                    <label htmlFor='datePicker'>Bitiş Tarihi:</label>
                    <input type='date' id='datePicker' />
                </div>
                <button className={styles['date_picker-btn']}>
                    Sprinti Başlat
                </button>
            </form>
        </div>
    );
}

export default DatePickerForm;
