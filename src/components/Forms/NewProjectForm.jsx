import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import Input from '../Input/Input';

import styles from './Forms.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Smooth from '../Smooth/Smooth';

const teams = [
    { id: 1, name: 'Marvel' },
    { id: 2, name: 'DC' },
];

function NewProjectForm() {
    const [projectName, setProjectName] = useState('');
    const [teamForProject, setTeamForProject] = useState(null);
    const [isTeamDropdownOpen, setTeamDropdownOpen] = useState();

    const selectTeamHandler = (selectedTeam) => {
        setTeamForProject(selectedTeam);
        setTeamDropdownOpen(false);
    };

    const removeTeamHandler = (selectedTeam) => {
        setTeamForProject(null);
    };

    return (
        <div className={styles['form-container']}>
            <div className={styles['header']}>
                <p>
                    <Smooth /> Bir Proje Ekleyin
                </p>
                <span className={styles['header-button']}>
                    <IoCloseOutline />
                </span>
            </div>

            <form className={styles['form']}>
                <Input
                    id='projectName'
                    name='projectName'
                    label='Proje Adı'
                    type='text'
                    value={projectName}
                    onChange={setProjectName}
                ></Input>

                <span>Bu Proje Hangi Takıma Ait</span>

                <div className={styles['dropdown-container']}>
                    <Dropdown
                        title='Takım Seçin'
                        data={teams}
                        toggle={setTeamDropdownOpen}
                        isOpen={isTeamDropdownOpen}
                        selectFn={selectTeamHandler}
                        selectedItems={teamForProject ? [teamForProject] : null}
                        onDeleteFn={removeTeamHandler}
                    />
                </div>

                <label htmlFor='description'>Projenin Tanımı</label>
                <textarea
                    name='description'
                    id='description'
                    className={styles['project-description']}
                ></textarea>

                <button className={styles['btn-add']}>Projeyi Ekle</button>
            </form>
        </div>
    );
}

export default NewProjectForm;
