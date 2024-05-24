/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from './TaskDetail.module.css';

import userImg from '../../assets/user.png';
import { IoCloseOutline, IoTrashBinOutline } from 'react-icons/io5';

import { FaPlus, FaMinus } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';
import { useState } from 'react';
import {
    useGetProjectUsersQuery,
    useGetTaskDetailQuery,
    useUpdateTaskMutation,
} from '../../store/apis/projectApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function TaskDetail({ taskId, closeModal, sprintId, triggerFetchRequest }) {
    const projectId = useParams().projectId;
    const { userInfo } = useSelector((s) => s.user);

    const { data, isFetching } = useGetTaskDetailQuery({
        taskId,
        token: userInfo.token,
    });
    const { data: projectUsers, isFetching: isFetchingUsers } =
        useGetProjectUsersQuery({ projectId, token: userInfo.token });

    const [updateTask, result] = useUpdateTaskMutation();

    useEffect(() => {
        if (!isFetching) {
            setTitle(data.title);
            setDescription(data.description);
            setStoryPoint(data.storyPoint);
            setAssignees(data.assignees);
            setStatus(data.status);
        }
    }, [data, isFetching]);

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingStory, setIsEditingStory] = useState(false);
    const [showAssigneDropdown, setShowAssigneDropdown] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [storyPoint, setStoryPoint] = useState('');
    const [assignees, setAssignees] = useState([]);
    const [status, setStatus] = useState('');

    const updateTaskHandler = (newData) => {
        updateTask({
            body: { ...newData, taskId },
            sprintId,
            token: userInfo.token,
        })
            .then(() => {
                if (triggerFetchRequest) {
                    triggerFetchRequest();
                }
                toast.success('Görev Güncellendi');
            })
            .catch((error) => {
                toast.error('Görev Güncellenirken Bir Hata Oluştu');
            });
    };

    const handleAssigneeUpdate = (assignee, updateType) => {
        if (updateType === 'remove') {
            const newAssignees = assignees.filter(
                (item) => item.id !== assignee.id
            );
            updateTaskHandler({
                assignees: newAssignees.map((item) => item.id),
            });
            setAssignees(newAssignees);
        } else {
            updateTaskHandler({
                assignees: [...assignees, assignee].map((item) => item.id),
            });
            setAssignees((s) => [...s, assignee]);
        }
    };

    const handleTitleEditing = (editMode, sendRequest) => {
        if (editMode) {
            setIsEditingTitle(true);
        } else {
            if (sendRequest) {
                updateTaskHandler({ title });
            } else {
                setTitle(data.title);
            }

            setIsEditingTitle(false);
        }
    };

    const handleDescriptionEditing = (editMode, sendRequest) => {
        if (editMode) {
            setIsEditingDescription(true);
        } else {
            if (sendRequest) {
                updateTaskHandler({ description });
            } else {
                setDescription(data.description);
            }

            setIsEditingDescription(false);
        }
    };

    const handleStoryEditing = (editMode, sendRequest) => {
        if (editMode) {
            setIsEditingStory(true);
        } else {
            if (sendRequest) {
                updateTaskHandler({ storyPoint });
            } else {
                setStoryPoint(data.storyPoint);
            }

            setIsEditingStory(false);
        }
    };

    const checkUserAvailability = (userId) => {
        return assignees.some((assignee) => assignee.id === userId);
    };

    return (
        <>
            {isFetching || result.isLoading || (
                <div className={styles['task-container']}>
                    <div className={styles['task-header-container']}>
                        {isEditingTitle ? (
                            <div
                                className={styles['task-title-edit-container']}
                            >
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
                                {title}
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
                                <IoCloseOutline
                                    size={24}
                                    onClick={closeModal}
                                />
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
                                        styles[
                                            'task-description-edit-container'
                                        ]
                                    }
                                >
                                    <textarea
                                        type='text'
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className={
                                            styles['task-description-edit']
                                        }
                                    ></textarea>
                                    <div
                                        className={styles['task-edit-actions']}
                                    >
                                        <button
                                            className={styles['task-edit-btn']}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDescriptionEditing(
                                                    false,
                                                    true
                                                );
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
                            <div className={styles['story-point']}>
                                Story Puanı:
                                {isEditingStory ? (
                                    <>
                                        <input
                                            type='number'
                                            value={storyPoint}
                                            onChange={(e) =>
                                                setStoryPoint(e.target.value)
                                            }
                                        />
                                        <div
                                            className={
                                                styles['task-edit-actions']
                                            }
                                        >
                                            <button
                                                className={
                                                    styles['task-edit-btn']
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleStoryEditing(
                                                        false,
                                                        true
                                                    );
                                                }}
                                            >
                                                <TiTick />
                                            </button>
                                            <button
                                                className={
                                                    styles['task-edit-btn']
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleStoryEditing(false);
                                                }}
                                            >
                                                <IoCloseOutline />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <span
                                        onClick={() => setIsEditingStory(true)}
                                    >
                                        {storyPoint}
                                    </span>
                                )}
                            </div>
                            <div className={styles['section-title-container']}>
                                <h3 className={styles['section-title']}>
                                    Atananlar <span>Bana ata</span>{' '}
                                </h3>
                                <button
                                    className={styles['section-title-add-btn']}
                                    onClick={() => {
                                        setShowAssigneDropdown(
                                            (state) => !state
                                        );
                                    }}
                                >
                                    {showAssigneDropdown ? (
                                        <FaMinus />
                                    ) : (
                                        <FaPlus />
                                    )}
                                </button>
                                {showAssigneDropdown && (
                                    <div
                                        className={styles['dropdown-container']}
                                    >
                                        {isFetchingUsers ||
                                            projectUsers.map((user) => {
                                                if (
                                                    !checkUserAvailability(
                                                        user.id
                                                    )
                                                ) {
                                                    return (
                                                        <div
                                                            key={user.id}
                                                            className={
                                                                styles[
                                                                    'dropdown-item'
                                                                ]
                                                            }
                                                            onClick={() => {
                                                                handleAssigneeUpdate(
                                                                    user,
                                                                    'add'
                                                                );
                                                            }}
                                                        >
                                                            <img
                                                                src={userImg}
                                                                alt=''
                                                            />
                                                            <p>
                                                                {user.name}{' '}
                                                                {user.surname}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            })}
                                    </div>
                                )}
                            </div>

                            <div
                                className={styles['assigneed-users-container']}
                            >
                                {assignees.map((user) => (
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
                                        <span
                                            className={styles['user-actions']}
                                        >
                                            <IoCloseOutline
                                                size={16}
                                                onClick={() => {
                                                    handleAssigneeUpdate(
                                                        user,
                                                        'remove'
                                                    );
                                                }}
                                            />
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <h3 className={styles['section-title']}>
                                Raporlayan
                            </h3>
                            <div className={styles['user-container']}>
                                <img
                                    className={styles['user-img']}
                                    src={userImg}
                                    alt=''
                                />
                                <p>
                                    {data.reporter.name} {data.reporter.surname}
                                </p>
                            </div>

                            <h3 className={styles['section-title']}>Durum</h3>
                            <div className={styles['badge']}>{status}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskDetail;
