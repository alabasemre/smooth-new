/* eslint-disable react/prop-types */
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import styles from './Dropdown.module.css';

function Dropdown({
    title,
    data,
    toggle,
    isOpen,
    selectFn,
    selectedItems,
    onDeleteFn,
}) {
    const toggleHandler = () => {
        toggle((state) => !state);
    };

    const renderSelectedItems = () => {
        return selectedItems ? (
            selectedItems?.map((item) => (
                <div key={item.id} className={styles['toggle-selected-item']}>
                    {item.name}
                    <IoIosClose
                        size={20}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(item);
                        }}
                    />
                </div>
            ))
        ) : (
            <p>{title}</p>
        );
    };

    const onDelete = (item) => {
        onDeleteFn(item);
    };

    return (
        <div>
            <div className={styles['toggle']} onClick={toggleHandler}>
                {isOpen ? (
                    <div className={styles['toggle-selected']}>
                        {renderSelectedItems()}
                        <FaArrowDown size={14} />
                    </div>
                ) : (
                    <div className={styles['toggle-selected']}>
                        {renderSelectedItems()}

                        <FaArrowUp size={14} />
                    </div>
                )}
            </div>
            {isOpen && (
                <div className={styles['dropdown-items']}>
                    {data.map((item) => {
                        return (
                            <div
                                key={item.id}
                                onClick={() => {
                                    selectFn(item);
                                }}
                                className={styles['dropdown-item']}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
