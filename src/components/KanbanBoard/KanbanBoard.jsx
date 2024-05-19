import { useState } from 'react';
import styles from './KanbanBoard.module.css';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';

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

function KanbanBoard() {
    const [tasks, setTasks] = useState(initialData);
    const [columns, setColumn] = useState(initialData.column);

    function onDragEnd(result) {
        const { destination, source, draggableId } = result;
        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }

        const start = tasks.columns[source.droppableId];
        const finish = tasks.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newData = {
                ...tasks,
                columns: {
                    ...tasks.columns,
                    [newColumn.id]: newColumn,
                },
            };
            setTasks(newData);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newData = {
            ...tasks,
            tasks: {
                ...tasks.tasks,
                [+draggableId]: {
                    ...tasks.tasks[+draggableId],
                    status: destination.droppableId,
                },
            },
            columns: {
                ...tasks.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setTasks(newData);
    }

    return (
        <>
            {tasks && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className={styles['kanban-container']}>
                        {tasks.columnOrder.map((columnId, idx) => {
                            const column = tasks.columns[columnId];
                            const taskList = column.taskIds.map((taskId) => {
                                return tasks.tasks[taskId];
                            });

                            return (
                                <KanbanColumn
                                    key={column.id}
                                    column={column}
                                    tasks={taskList}
                                    colImgId={idx + 1}
                                />
                            );
                        })}
                    </div>
                </DragDropContext>
            )}
        </>
    );
}

export default KanbanBoard;
