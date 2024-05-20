import { LuPlusCircle } from 'react-icons/lu';
import styles from './Project.module.css';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import AddTaskForm from '../../components/Forms/AddTaskForm';
import { useParams } from 'react-router-dom';
import AddSprintForm from '../../components/Forms/AddSprintForm';
import DatePickerForm from '../../components/Forms/DatePickerForm';

const sprints = [
    {
        id: 1,
        name: 'Sprint 1',
        tasks: [
            {
                id: 1,
                title: 'Haftalık Gösterim Modülünün Eklenmesi',
            },
            { id: 2, title: 'Telefon Modülünün Eklenmesi' },
        ],
        status: 'On progress',
        startDate: '20-05-2024',
        endDate: '30-05-2024',
        createdDate: '20-05-2024',
    },
    {
        id: 2,
        name: 'Sprint 2',
        tasks: [
            {
                id: 1,
                title: 'Saat Güncelleme Probleminin Çözülmesi',
            },
        ],
        status: 'Done',
        startDate: '20-04-2024',
        endDate: '30-04-2024',
        createdDate: '20-04-2024',
    },
    {
        id: 3,
        name: 'Sprint 3',
        tasks: [
            {
                id: 2,
                title: 'Do something',
            },
        ],
        status: 'Planned',
        startDate: '',
        endDate: '',
        createdDate: '20-04-2024',
    },
];

function Sprints() {
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showAddSprintModal, setShowAddSprintModal] = useState(false);

    const [sprintId, setSprintId] = useState();
    const projectId = useParams().projectId;

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
            <h1 className={styles['sprints_header']}>Sprintler</h1>
            <div className={styles['sprints_content-container']}>
                <button
                    className={styles['sprints_add-btn']}
                    onClick={() => setShowAddSprintModal(true)}
                >
                    Sprint Ekle
                </button>
                {sprints.map((sprint) => (
                    <div
                        className={styles['sprints_tasks-container']}
                        key={sprint.id}
                    >
                        <div className={styles['add_sprints-actions']}>
                            <h1 className={styles['sprints_sprint-title']}>
                                {sprint.name} ({sprint.status})
                            </h1>
                            <div
                                className={
                                    styles['sprints_sprint-action-buttons']
                                }
                            >
                                {sprint.status !== 'Done' ? (
                                    <button
                                        onClick={() => {
                                            editSprintModalHandler(sprint.id);
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
                        </div>

                        <ul className={styles['sprints_sprint-task-list']}>
                            {sprint.tasks.map((task) => (
                                <li
                                    key={task.id}
                                    className={
                                        styles['sprints_sprint-task-item']
                                    }
                                >
                                    {task.title}
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
