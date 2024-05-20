import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa6';

import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import Modal from '../../components/Modal/Modal';
import TaskDetail from '../../components/TaskDetail/TaskDetail';

import styles from './Project.module.css';
import AddTaskForm from '../../components/Forms/AddTaskForm';

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
        'column-2': {
            id: 'column-2',
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
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

function Kanban() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState(
        activeSprints[activeSprints.length - 1]
    );
    const [showDetailModal, setDetailModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    let [searchParams, setSearchParams] = useSearchParams();
    const projectId = useParams().projectId;
    const taskId = searchParams.get('taskId');
    const navigate = useNavigate();

    useEffect(() => {
        const sprintId = searchParams.get('sprintId');
        if (sprintId) {
            setSelectedSprint(activeSprints[sprintId - 1]);
            setSearchParams('');
        }
    }, []);

    useEffect(() => {
        if (taskId) {
            setDetailModal(true);
        } else {
            setDetailModal(false);
        }
    }, [taskId]);

    const closeTaskDetail = () => {
        navigate('');
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
                        closeModal={() => setShowAddTaskModal(false)}
                    />
                </Modal>
            )}

            <div className={styles['kanban_header-container']}>
                <div className={styles['kanban_header']}>
                    <h1>Pano / {selectedSprint.name}</h1>
                    <button
                        className={styles['kanban_btn']}
                        onClick={() => setShowAddTaskModal(true)}
                    >
                        Görev Ekle <FaPlus />{' '}
                    </button>
                </div>

                <div className={styles['kanban_select-sprints-container']}>
                    <p className={styles['kanban_selected-sprint-date']}>
                        Başlangıç Tarihi : {selectedSprint.startDate}
                    </p>
                    <p className={styles['kanban_selected-sprint-date']}>
                        Bitiş Tarihi : {selectedSprint.endDate}
                    </p>
                    <div
                        className={styles['kanban_selected-sprint-container']}
                        onClick={() => setDropdownOpen((s) => !s)}
                    >
                        {selectedSprint.name}
                        {dropdownOpen ? <FaArrowUp /> : <FaArrowDown />}
                        {dropdownOpen && (
                            <div
                                className={styles['kanban_dropdown-container']}
                            >
                                {activeSprints.map((sprint, idx) => {
                                    if (sprint.name !== selectedSprint.name) {
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
                                                        activeSprints[idx]
                                                    );
                                                }}
                                            >
                                                {sprint.name}{' '}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        )}
                    </div>

                    <button
                        className={styles['kanban_btn']}
                        onClick={() => setShowAddTaskModal(true)}
                    >
                        Sprinti Sonlandır
                    </button>
                </div>
            </div>
            <KanbanBoard data={initialData} />
            {showDetailModal && (
                <Modal isOpen={showDetailModal} setIsOpen={closeTaskDetail}>
                    <TaskDetail taskId={taskId} closeModal={closeTaskDetail} />
                </Modal>
            )}
        </section>
    );
}

export default Kanban;
