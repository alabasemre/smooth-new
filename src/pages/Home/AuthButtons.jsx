import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function AuthButtons() {
    return (
        <div className={styles.buttons}>
            <Link
                to='login'
                className={`${styles['button']} ${styles['button-reversed']}`}
            >
                Giriş Yap
            </Link>
            <Link
                to={'/register'}
                className={`${styles['button']} ${styles['button-primary']}`}
            >
                Üye Ol
            </Link>
        </div>
    );
}

export default AuthButtons;
