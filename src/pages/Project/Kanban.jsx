/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa6';

import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import Modal from '../../components/Modal/Modal';
import TaskDetail from '../../components/TaskDetail/TaskDetail';

import styles from './Project.module.css';
import AddTaskForm from '../../components/Forms/AddTaskForm';
import {
    useGetActiveSprintsQuery,
    useLazyGetActiveSprintsTasksQuery,
} from '../../store/apis/projectApi';
import { useSelector } from 'react-redux';

const activeSprints = [
    { id: 1, name: 'Sprint 1', startDate: '01-01-2019', endDate: '17-01-2019' },
    { id: 2, name: 'Sprint 2', startDate: '04-01-2019', endDate: '19-01-2019' },
];

const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            title: 'Take out the garbage',
            content: 'lorem ipsum dolor',
        },
        'task-2': {
            id: 'task-2',
            title: 'Watch my favorite show',
            content: 'lorem ipsum dolor',
        },
        'task-3': {
            id: 'task-3',
            title: 'Charge my phone',
            content: 'lorem ipsum dolor',
        },
        'task-4': {
            id: 'task-4',
            title: 'Cook dinner',
            content: 'lorem ipsum dolor',
        },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Planlandı',
            taskIds: ['task-1', 'task-2', 'task-3'],
        },
        'on progress': {
            id: 'on progress',
            title: 'Devam Eden İşler',
            taskIds: ['task-4'],
        },
        'column-3': {
            id: 'column-3',
            title: 'Tamamlandı',
            taskIds: [],
        },
        'column-4': {
            id: 'column-4',
            title: 'Kapandı',
            taskIds: [],
        },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'on progress', 'column-3', 'column-4'],
};

function Kanban() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [showDetailModal, setDetailModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [kanbanTasks, setKanbanTasks] = useState(null);
    const [taskId, setTaskId] = useState(null);
    const { userInfo } = useSelector((s) => s.user);

    const selectedSprintId = selectedSprint ? selectedSprint.id : null;

    let [searchParams, setSearchParams] = useSearchParams();
    const projectId = useParams().projectId;

    const { data: activeSprintsData, isFetching: isFetchingActiveSprints } =
        useGetActiveSprintsQuery({
            projectId,
            token: userInfo.token,
        });

    const [
        getActiveSprintsTasks,
        { data: taskList, isFetching: isFetchingActiveTasks },
    ] = useLazyGetActiveSprintsTasksQuery({
        projectId,
        token: userInfo.token,
    });

    const setTaskData = (data) => {
        const tasks = {};
        const columns = {
            planned: {
                id: 'planned',
                title: 'Planlandı',
                taskIds: [],
            },
            'on progress': {
                id: 'on progress',
                title: 'Devam Eden İşler',
                taskIds: [],
            },
            done: {
                id: 'done',
                title: 'Tamamlandı',
                taskIds: [],
            },
            closed: {
                id: 'closed',
                title: 'Kapandı',
                taskIds: [],
            },
        };
        const columnOrder = ['planned', 'on progress', 'done', 'closed'];
        data.forEach((task) => {
            tasks[task.id] = task;
            columns[task.status.toLowerCase()].taskIds.push(task.id);
        });
        const kanbanData = { tasks, columns, columnOrder };
        setKanbanTasks({ ...kanbanData });
    };

    useEffect(() => {
        if (selectedSprint) {
            getActiveSprintsTasks({
                sprintId: selectedSprintId,
                token: userInfo.token,
            }).then((resp) => {
                setTaskData(resp.data);
            });
        }
    }, [selectedSprintId]);

    useEffect(() => {
        const sprintId = searchParams.get('sprintId');
        if (sprintId) {
            setSearchParams('');
        }
    }, []);

    const openTaskDetail = (id) => {
        setTaskId(id);
        setDetailModal(true);
    };

    // const [trigger,setTrigger] = useState(false);
    const triggerFetch = () => {
        console.log('trigger comp');
        if (selectedSprint) {
            getActiveSprintsTasks({
                sprintId: selectedSprintId,
                token: userInfo.token,
            }).then((resp) => {
                setTaskData(resp.data);
            });
        }
    };

    const closeTaskDetail = () => {
        setDetailModal(false);
    };

    return (
        <section className={styles['kanban_container']}>
            {showAddTaskModal && (
                <Modal
                    isOpen={showAddTaskModal}
                    setIsOpen={() => setShowAddTaskModal(false)}
                >
                    <AddTaskForm
                        sprintId={selectedSprint.id}
                        projectId={projectId}
                        triggerFetchRequest={triggerFetch}
                        closeModal={() => setShowAddTaskModal(false)}
                    />
                </Modal>
            )}
            {showDetailModal && (
                <Modal isOpen={showDetailModal} setIsOpen={closeTaskDetail}>
                    <TaskDetail
                        taskId={taskId}
                        closeModal={closeTaskDetail}
                        sprintId={selectedSprintId}
                        triggerFetchRequest={triggerFetch}
                    />
                </Modal>
            )}

            <div className={styles['kanban_header-container']}>
                <div className={styles['kanban_header']}>
                    <h1>
                        Pano /{' '}
                        {selectedSprint
                            ? selectedSprint.name
                            : 'Sprint Seçiniz'}
                    </h1>
                    {selectedSprint && (
                        <button
                            className={styles['kanban_btn']}
                            onClick={() => setShowAddTaskModal(true)}
                        >
                            Görev Ekle <FaPlus />{' '}
                        </button>
                    )}
                </div>

                <div className={styles['kanban_select-sprints-container']}>
                    {selectedSprint && (
                        <>
                            <p
                                className={
                                    styles['kanban_selected-sprint-date']
                                }
                            >
                                Başlangıç Tarihi : {selectedSprint.startDate}
                            </p>
                            <p
                                className={
                                    styles['kanban_selected-sprint-date']
                                }
                            >
                                Bitiş Tarihi : {selectedSprint.endDate}
                            </p>
                        </>
                    )}

                    <div
                        className={styles['kanban_selected-sprint-container']}
                        onClick={(e) => setDropdownOpen((s) => !s)}
                    >
                        {selectedSprint ? selectedSprint.name : 'Sprint Seçin'}
                        {dropdownOpen ? <FaArrowUp /> : <FaArrowDown />}
                        {dropdownOpen && (
                            <div
                                className={styles['kanban_dropdown-container']}
                            >
                                {isFetchingActiveSprints ||
                                    isFetchingActiveTasks ||
                                    activeSprintsData.map((sprint, idx) => {
                                        if (
                                            selectedSprint === null ||
                                            selectedSprint.id !== sprint.id
                                        ) {
                                            return (
                                                <div
                                                    className={
                                                        styles[
                                                            'kanban_dropdown-item'
                                                        ]
                                                    }
                                                    key={sprint.id}
                                                    onClick={() => {
                                                        setSelectedSprint(
                                                            sprint
                                                        );
                                                    }}
                                                >
                                                    {sprint.name}
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        )}
                    </div>
                    {selectedSprint && (
                        <button
                            className={styles['kanban_btn']}
                            onClick={() => setShowAddTaskModal(true)}
                        >
                            Sprinti Sonlandır
                        </button>
                    )}
                </div>
            </div>
            {selectedSprint && (
                <KanbanBoard
                    data={kanbanTasks}
                    openTaskDetail={openTaskDetail}
                    sprintId={selectedSprintId}
                />
            )}
        </section>
    );
}

export default Kanban;
