/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaArrowDown, FaMinus } from 'react-icons/fa6';
import userImg from '../../assets/user.png';
import styles from './Forms.module.css';
import Smooth from '../Smooth/Smooth';
import { IoCloseOutline } from 'react-icons/io5';
import {
    useAddTaskMutation,
    useGetProjectUsersQuery,
} from '../../store/apis/projectApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function AddTaskForm({ sprintId, projectId, closeModal, triggerFetchRequest }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [storyPoint, setStoryPoint] = useState(0);
    const [assignees, setAssignees] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const removeAssignee = (id) => {
        const newAssignees = assignees.filter((user) => user.id != id);
        setAssignees(newAssignees);
    };

    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching } = useGetProjectUsersQuery({
        projectId: projectId,
        token: userInfo.token,
    });

    const [addTask, results] = useAddTaskMutation();

    const onSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') {
            console.log('Title is required');
            return;
        }

        addTask({
            body: {
                title,
                description,
                sprintId,
                assignees: assignees.map((user) => user.id),
                storyPoint,
            },
            token: userInfo.token,
        })
            .then(() => {
                toast.success('Görev Sprinte Eklendi');
                if (triggerFetchRequest) {
                    triggerFetchRequest();
                }
                closeModal();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Görev Sprinte Eklenirken Bir Hata Oluştu');
            });
    };

    return (
        <div className={styles['add_task-container']}>
            <div className={styles['header']}>
                <div>
                    <Smooth /> Bir Görev Ekleyin
                </div>
                <span className={styles['header-button']}>
                    <IoCloseOutline size={20} onClick={closeModal} />
                </span>
            </div>
            <form onSubmit={onSubmit}>
                <div className={styles['add_task-input-group']}>
                    <label className={styles['add_task-label']} htmlFor='title'>
                        Görev Başlığı
                    </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles['add_task-input-group']}>
                    <label
                        className={styles['add_task-label']}
                        htmlFor='description'
                    >
                        Görev Tanımı
                    </label>
                    <textarea
                        name='description'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className={styles['add_task-assignees-container']}>
                    <h3>Atanan</h3>
                    <div
                        className={styles['add_task-assignees-dropdown']}
                        onClick={() => setDropdownOpen((s) => !s)}
                    >
                        {assignees.length === 0 ? (
                            <div className={styles['add_task-assignees-empty']}>
                                Görev Kimseye Atanmadı <FaArrowDown />
                            </div>
                        ) : (
                            assignees.map((user) => (
                                <div
                                    className={
                                        styles['add_task-assignee-badge']
                                    }
                                    key={user.id}
                                >
                                    {user.name} {user.surname}
                                    <FaMinus
                                        size={20}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeAssignee(user.id);
                                        }}
                                    />
                                </div>
                            ))
                        )}

                        {dropdownOpen && (
                            <div
                                className={
                                    styles[
                                        'add_task-assignees-dropdown-container'
                                    ]
                                }
                            >
                                {isFetching ||
                                    data
                                        .filter(
                                            (user) =>
                                                !assignees
                                                    .map((user) => user.id)
                                                    .includes(user.id)
                                        )
                                        .map((user) => {
                                            return (
                                                <div
                                                    className={
                                                        styles[
                                                            'add_task-assignees-dropdown-item'
                                                        ]
                                                    }
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setAssignees((s) => [
                                                            ...s,
                                                            user,
                                                        ]);
                                                    }}
                                                    key={user.id}
                                                >
                                                    <img src={userImg} alt='' />
                                                    {user.name} {user.surname}
                                                </div>
                                            );
                                        })}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles['add_task-story-point']}>
                    <label
                        className={styles['add_task-label']}
                        htmlFor='story-point'
                    >
                        Story Puanı:
                    </label>
                    <input
                        type='number'
                        name='story-point'
                        id='story-point'
                        value={storyPoint}
                        min={0}
                        onChange={(e) => setStoryPoint(e.target.value)}
                    />
                </div>

                <button className={styles['add_task-btn']}>Ekle</button>
            </form>
        </div>
    );
}

export default AddTaskForm;
