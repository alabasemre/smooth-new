import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import Smooth from '../Smooth/Smooth';

import styles from './Forms.module.css';
import { useSelector } from 'react-redux';
import {
    useCreateProjectMutation,
    useGetAdminProjectsQuery,
} from '../../store/apis/projectApi';
import { toast } from 'react-toastify';

const teams = [
    { id: 1, name: 'Marvel' },
    { id: 2, name: 'DC' },
];

function NewProjectForm({ toggleModal }) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [teamForProject, setTeamForProject] = useState(null);
    const [isTeamDropdownOpen, setTeamDropdownOpen] = useState();

    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching, error } = useGetAdminProjectsQuery({
        token: userInfo.token,
    });

    const [createProject, results] = useCreateProjectMutation();

    const selectTeamHandler = (selectedTeam) => {
        setTeamForProject(selectedTeam);
        setTeamDropdownOpen(false);
    };

    const removeTeamHandler = (selectedTeam) => {
        setTeamForProject(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (teamForProject === null) {
            console.log('Team is empty');
            return;
        }

        if (projectName.trim().length === 0) {
            console.log('Teamname is empty');
            return;
        }

        createProject({
            body: {
                name: projectName,
                description: projectDescription,
                teamId: teamForProject.id,
            },
            token: userInfo.token,
        })
            .then(() => {
                toast.success('Proje Başarıyla Oluşturuldu');
                toggleModal(false);
            })
            .catch(() => {
                toast.error('Proje Oluşturulurken Bir Hata Oluştu.');
            });
    };

    return (
        <div className={styles['form-container']}>
            <div className={styles['header']}>
                <div>
                    <Smooth /> Bir Proje Ekleyin
                </div>
                <span className={styles['header-button']}>
                    <IoCloseOutline size={20} onClick={toggleModal} />
                </span>
            </div>

            <form className={styles['form']} onSubmit={onSubmit}>
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
                    {isFetching || (
                        <Dropdown
                            title='Takım Seçin'
                            data={data}
                            toggle={setTeamDropdownOpen}
                            isOpen={isTeamDropdownOpen}
                            selectFn={selectTeamHandler}
                            selectedItems={
                                teamForProject ? [teamForProject] : null
                            }
                            onDeleteFn={removeTeamHandler}
                        />
                    )}
                </div>

                <label htmlFor='description'>Projenin Tanımı</label>
                <textarea
                    name='description'
                    id='description'
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className={styles['project-description']}
                ></textarea>

                <button className={styles['btn-add']}>Projeyi Ekle</button>
            </form>
        </div>
    );
}

export default NewProjectForm;
