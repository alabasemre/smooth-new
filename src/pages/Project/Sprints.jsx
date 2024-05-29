import { LuPlusCircle } from 'react-icons/lu';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import AddTaskForm from '../../components/Forms/AddTaskForm';
import { useOutletContext, useParams } from 'react-router-dom';
import AddSprintForm from '../../components/Forms/AddSprintForm';
import { useSelector } from 'react-redux';
import {
    useGetSprintsQuery,
    useStartSprintMutation,
} from '../../store/apis/projectApi';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import styles from './Project.module.css';
import TaskDetail from '../../components/TaskDetail/TaskDetail';

const sprintTranslation = {
    planned: 'Planlandı',
    'on progress': 'Devam Ediyor',
    done: 'Tamamlandı',
};

function Sprints() {
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showAddSprintModal, setShowAddSprintModal] = useState(false);
    const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);

    const [taskId, setTaskId] = useState();
    const [sprintId, setSprintId] = useState();
    const [sprintData, setSprintData] = useState();

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

    const [startSprint, startResult] = useStartSprintMutation();

    const startSprintHandler = (sprintData) => {
        const today = new Date().getTime();
        const d = sprintData.endDate.split('.');
        const dueDate = new Date(`${d[2]}-${d[1]}-${d[0]}`);
        if (dueDate.getTime() < today) {
            console.log('Check your due date');
            return;
        }

        startSprint({
            body: { sprintId: sprintData.id },
            token: userInfo.token,
        });
    };

    const handleTaskDetailModal = (taskId, sprintId) => {
        setTaskId(taskId);
        setSprintId(sprintId);
        setShowTaskDetailModal(true);
    };

    const taskModalHandler = (sprintId) => {
        setSprintId(sprintId);
        setShowAddTaskModal(true);
    };

    const editSprintModalHandler = (sprintId, sprint) => {
        setSprintId(sprintId);
        setSprintData(sprint);
        setShowAddSprintModal(true);
    };

    const closeSprintModalHandler = () => {
        setSprintId();
        setSprintData();
        setShowAddSprintModal(false);
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
                    setIsOpen={() => closeSprintModalHandler()}
                >
                    <AddSprintForm
                        projectId={projectId}
                        sprintId={sprintId}
                        sprintData={sprintData}
                        closeModal={() => closeSprintModalHandler()}
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
                        sprintId={sprintId}
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
                                    {sprint.name} (
                                    {
                                        sprintTranslation[
                                            sprint.status.toLowerCase()
                                        ]
                                    }
                                    )
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
                                                        sprint.id,
                                                        sprint
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
                                                    startSprintHandler(sprint);
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
                                                    handleTaskDetailModal(
                                                        task.id,
                                                        sprint.id
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
