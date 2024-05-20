/* eslint-disable react/prop-types */
import styles from './TaskDetail.module.css';

import userImg from '../../assets/user.png';
import { IoCloseOutline, IoTrashBinOutline } from 'react-icons/io5';

import { FaPlus, FaMinus } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';
import { useRef, useState } from 'react';

const mockUsers = [
    { id: 1, name: 'Emre', surname: 'Alabaş', imgUrl: '' },
    { id: 2, name: 'Oğuz', surname: 'Doğan', imgUrl: '' },
    { id: 3, name: 'Ahsen', surname: 'Ahsen', imgUrl: '' },
];

const mockTask = {
    id: 1,
    title: 'Take out garbage',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    assignees: [
        { id: 1, name: 'Emre', surname: 'Alabaş', imgUrl: '' },
        { id: 2, name: 'Oğuz', surname: 'Doğan', imgUrl: '' },
    ],
    reporter: {
        id: 3,
        name: 'Ahsen',
        surname: 'Bilgili',
        imgUrl: '',
    },
    storyPoint: 5,
};

function TaskDetail({ taskId, closeModal }) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showAssigneDropdown, setShowAssigneDropdown] = useState(false);

    const [title, setTitle] = useState(mockTask.title);
    const [description, setDescription] = useState(mockTask.description);

    const handleTitleEditing = (editMode, sendRequest) => {
        if (editMode) {
            setIsEditingTitle(true);
        } else {
            setIsEditingTitle(false);
        }
    };

    const handleDescriptionEditing = (editMode, sendRequest) => {
        if (editMode) {
            setIsEditingDescription(true);
        } else {
            setIsEditingDescription(false);
        }
    };

    return (
        <div className={styles['task-container']}>
            <div className={styles['task-header-container']}>
                {isEditingTitle ? (
                    <div className={styles['task-title-edit-container']}>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles['task-title-edit']}
                        ></input>
                        <div className={styles['task-edit-actions']}>
                            <button
                                className={styles['task-edit-btn']}
                                onClick={() => {
                                    handleTitleEditing(false, true);
                                }}
                            >
                                <TiTick />
                            </button>
                            <button
                                className={styles['task-edit-btn']}
                                onClick={() => {
                                    handleTitleEditing(false);
                                }}
                            >
                                <IoCloseOutline />
                            </button>
                        </div>
                    </div>
                ) : (
                    <h1
                        className={styles['task-title']}
                        onClick={() => handleTitleEditing(true)}
                    >
                        {title} {taskId}
                    </h1>
                )}

                <div className={styles['task-actions']}>
                    <span className={styles['header-button']}>
                        <IoTrashBinOutline
                            size={24}
                            onClick={() => {
                                //TODO: DELETE
                            }}
                        />
                    </span>

                    <span className={styles['header-button']}>
                        <IoCloseOutline size={24} onClick={closeModal} />
                    </span>
                </div>
            </div>

            <div className={styles['content-container']}>
                <div
                    className={styles['task-description-container']}
                    onClick={() => {
                        handleDescriptionEditing(true);
                    }}
                >
                    {isEditingDescription ? (
                        <div
                            className={
                                styles['task-description-edit-container']
                            }
                        >
                            <textarea
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={styles['task-description-edit']}
                            ></textarea>
                            <div className={styles['task-edit-actions']}>
                                <button
                                    className={styles['task-edit-btn']}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDescriptionEditing(false, true);
                                    }}
                                >
                                    <TiTick />
                                </button>
                                <button
                                    className={styles['task-edit-btn']}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDescriptionEditing(false);
                                    }}
                                >
                                    <IoCloseOutline />
                                </button>
                            </div>
                        </div>
                    ) : (
                        description
                    )}
                </div>
                <div className={styles['assignees-container']}>
                    <h3 className={styles['story-point']}>
                        Story Puanı: <span>5</span>
                    </h3>
                    <div className={styles['section-title-container']}>
                        <h3 className={styles['section-title']}>
                            Atananlar <span>Bana ata</span>{' '}
                        </h3>
                        <button
                            className={styles['section-title-add-btn']}
                            onClick={() => {
                                setShowAssigneDropdown((state) => !state);
                            }}
                        >
                            {showAssigneDropdown ? <FaMinus /> : <FaPlus />}
                        </button>
                        {showAssigneDropdown && (
                            <div className={styles['dropdown-container']}>
                                {mockUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className={styles['dropdown-item']}
                                    >
                                        <img src={userImg} alt='' />
                                        <p>
                                            {user.name} {user.surname}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles['assigneed-users-container']}>
                        {mockTask.assignees.map((user) => (
                            <div
                                key={user.id}
                                className={styles['user-container']}
                            >
                                <img
                                    className={styles['user-img']}
                                    src={userImg}
                                    alt=''
                                />
                                <p>
                                    {user.name} {user.surname}
                                </p>
                                <span className={styles['user-actions']}>
                                    <IoCloseOutline
                                        size={16}
                                        onClick={() => {
                                            //TODO: DELETE
                                        }}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>

                    <h3 className={styles['section-title']}>Raporlayan</h3>
                    <div className={styles['user-container']}>
                        <img
                            className={styles['user-img']}
                            src={userImg}
                            alt=''
                        />
                        <p>
                            {mockTask.reporter.name} {mockTask.reporter.surname}
                        </p>
                    </div>

                    <h3 className={styles['section-title']}>Durum</h3>
                    <div className={styles['badge']}>Planlandı</div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;
