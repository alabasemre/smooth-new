/* eslint-disable react/prop-types */
import { Droppable } from 'react-beautiful-dnd';

import KanbanTask from './KanbanTask';
import styles from './KanbanBoard.module.css';

import plannedImg from '../../assets/kanban/book.png';
import progress from '../../assets/kanban/timespan.png';
import done from '../../assets/kanban/spinner.png';
import closed from '../../assets/kanban/checkbox.png';

const columnImg = {
    1: plannedImg,
    2: progress,
    3: done,
    4: closed,
};

function KanbanColumn({ column, tasks, colImgId }) {
    return (
        <div className={styles['column-container']}>
            <div className={styles['column-header']}>
                <img src={columnImg[colImgId]} alt='' />{' '}
                <h3 className={styles['column-title']}> {column.title}</h3>
            </div>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        className={`${styles['task-list']} ${
                            snapshot.isDraggingOver
                                ? styles['column-dragover']
                                : ''
                        } `}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => {
                            return (
                                <KanbanTask
                                    key={task.id}
                                    task={task}
                                    index={index}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default KanbanColumn;
