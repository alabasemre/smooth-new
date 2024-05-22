import { LuPlusCircle } from 'react-icons/lu';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import AddTaskForm from '../../components/Forms/AddTaskForm';
import { useOutletContext, useParams } from 'react-router-dom';
import AddSprintForm from '../../components/Forms/AddSprintForm';
import { useSelector } from 'react-redux';
import { useGetSprintsQuery } from '../../store/apis/projectApi';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import styles from './Project.module.css';
import TaskDetail from '../../components/TaskDetail/TaskDetail';

function Sprints() {
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showAddSprintModal, setShowAddSprintModal] = useState(false);
    const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);

    const [taskId, setTaskId] = useState();
    const [sprintId, setSprintId] = useState();

    const user = useOutletContext();
    const isAdmin =
        user.userRole === 'admin' ||
        user.userRole === 'owner' ||
        user.userRole === 'manager';

    const projectId = useParams().projectId;

    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching, error } = useGetSprintsQuery({
        projectId,
        token: userInfo.token,
    });

    const handleTaskDetailModal = (taskId) => {
        setTaskId(taskId);
        setShowTaskDetailModal(true);
    };

    const taskModalHandler = (sprintId) => {
        setSprintId(sprintId);
        setShowAddTaskModal(true);
    };

    const editSprintModalHandler = (sprintId) => {
        setSprintId(sprintId);
        setShowAddSprintModal(true);
    };

    return (
        <section className={styles['section']}>
            {showAddTaskModal && (
                <Modal
                    isOpen={showAddTaskModal}
                    setIsOpen={() => setShowAddTaskModal(false)}
                >
                    <AddTaskForm
                        sprintId={sprintId}
                        projectId={projectId}
                        closeModal={() => setShowAddTaskModal(false)}
                    />
                </Modal>
            )}
            {showAddSprintModal && (
                <Modal
                    isOpen={showAddSprintModal}
                    setIsOpen={() => setShowAddSprintModal(false)}
                >
                    <AddSprintForm
                        projectId={projectId}
                        sprintId={sprintId}
                        closeModal={() => setShowAddSprintModal(false)}
                    />
                </Modal>
            )}
            {showTaskDetailModal && (
                <Modal
                    isOpen={showTaskDetailModal}
                    setIsOpen={() => setShowTaskDetailModal(false)}
                >
                    <TaskDetail
                        taskId={taskId}
                        closeModal={() => setShowTaskDetailModal(false)}
                    />
                </Modal>
            )}
            <h1 className={styles['sprints_header']}>Sprintler</h1>
            <div className={styles['sprints_content-container']}>
                {isAdmin && (
                    <button
                        className={styles['sprints_add-btn']}
                        onClick={() => setShowAddSprintModal(true)}
                    >
                        Sprint Ekle
                    </button>
                )}

                {isFetching ||
                    data.map((sprint) => (
                        <div
                            className={styles['sprints_tasks-container']}
                            key={sprint.id}
                        >
                            <div className={styles['add_sprints-actions']}>
                                <h1 className={styles['sprints_sprint-title']}>
                                    {sprint.name} ({sprint.status})
                                </h1>
                                {isAdmin && (
                                    <div
                                        className={
                                            styles[
                                                'sprints_sprint-action-buttons'
                                            ]
                                        }
                                    >
                                        {sprint.status !== 'Done' ? (
                                            <button
                                                onClick={() => {
                                                    editSprintModalHandler(
                                                        sprint.id
                                                    );
                                                }}
                                            >
                                                Sprinti Düzenle
                                            </button>
                                        ) : (
                                            <></>
                                        )}

                                        {sprint.status === 'Planned' ? (
                                            <button
                                                onClick={() => {
                                                    // TODO: Start Sprint
                                                }}
                                            >
                                                Sprinti Başlat
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                )}
                            </div>

                            <ul className={styles['sprints_sprint-task-list']}>
                                {sprint.tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className={
                                            styles['sprints_sprint-task-item']
                                        }
                                    >
                                        <span> {task.title}</span>{' '}
                                        <div
                                            className={
                                                styles[
                                                    'sprints_sprint-task-actions'
                                                ]
                                            }
                                        >
                                            <FaRegEdit
                                                size={24}
                                                onClick={() => {
                                                    console.log('first');
                                                    handleTaskDetailModal(
                                                        task.id
                                                    );
                                                }}
                                            />
                                            <MdDelete size={24} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {sprint.status !== 'Done' ? (
                                <button
                                    className={styles['sprints_add-task-btn']}
                                    onClick={() => {
                                        taskModalHandler(sprint.id);
                                    }}
                                >
                                    <LuPlusCircle size={24} />
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default Sprints;
