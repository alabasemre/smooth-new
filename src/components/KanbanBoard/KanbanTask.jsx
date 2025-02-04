/* eslint-disable react/prop-types */
import { Draggable } from 'react-beautiful-dnd';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import userImg from '../../assets/user.png';

import styles from './KanbanBoard.module.css';
function KanbanTask({ task, index, openTaskDetail }) {
    const classes = `${styles['task-container']}`;

    const taskClickHandler = () => {
        openTaskDetail(task.id);
    };
    console.log(task);
    // TODO: FETCH USER IMAGES WITH TASK ID
    return (
        <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
            {(provided, snapshot) => (
                <div
                    className={`${classes} ${
                        snapshot.isDragging ? styles['task-dragging'] : ''
                    } `}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={taskClickHandler}
                >
                    <h3 className={styles['task-title']}>{task.title}</h3>
                    <p className={styles['task-content']}>{task.description}</p>

                    <div className={styles['task-badges']}>
                        <div>
                            <img
                                src={
                                    task.assignee
                                        ? task.assignee.avatarUrl
                                        : userImg
                                }
                                className={styles['assignee-img']}
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default KanbanTask;

// function priorityArrow(priority) {
//     switch (priority) {
//         case 1:
//             return <FaArrowUp color='var(--priority-1)' />;
//         case 2:
//             return <FaArrowUp color='var(--priority-2)' />;
//         case 3:
//             return <FaArrowDown color='var(--priority-3)' />;
//         default:
//             break;
//     }
// }

// function assigneesImages(assignees) {
//     if (assignees.length === 0) {
//         return <p>...</p>;
//     }

//     return assignees.map((id) => {
//         return (
//             <img
//                 key={id}
//                 src={initialData.workers[id].img}
//                 className={styles['assignee-img']}
//                 alt=''
//             />
//         );
//     });
// }
