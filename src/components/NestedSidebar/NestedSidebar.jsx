/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './NestedSidebar.module.css';

function NestedSidebar({ data, path, children }) {
    const generatePath = path ? `${path}/` : '';

    return (
        <div className={styles.navigations}>
            {children}
            <ul className={styles['links-container']}>
                {data.map((data) => (
                    <li key={data.id} className={styles['link-container']}>
                        <Link to={`${generatePath}${data.id}`}>
                            <p className={styles['link-name']}>{data.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NestedSidebar;
