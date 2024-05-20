/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './KanbanBoard.module.css';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';

function KanbanBoard({ data }) {
    const [tasks, setTasks] = useState(data);
    // const [columns, setColumn] = useState(data.column);

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
