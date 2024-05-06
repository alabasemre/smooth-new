import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';

import loginImg from '../../assets/login.png';
import { useRef, useState } from 'react';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [loginError, setLoginError] = useState({
        hasError: false,
        errorMessage: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // TODO: Add validation

        const userData = {
            email,
            password,
        };
        console.log(userData);
        // TODO: Login with credentials
    };

    return (
        <div className={styles['auth-container']}>
            <div className={styles['auth-content']}>
                <Logo />
                <div className={styles['auth-form-container']}>
                    <h3 className={styles['auth-form-title']}>
                        <span>Smooth</span> bir giriş yapın.
                    </h3>
                    <form onSubmit={onSubmit} className={styles['auth-form']}>
                        <div className={styles['input-group']}>
                            <label htmlFor='email'>E-Posta Adresi</label>
                            <input
                                type='text'
                                name='email'
                                id='email'
                                ref={emailRef}
                            />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor='password'>Şifre</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                ref={passwordRef}
                            />
                        </div>
                        {loginError.hasError && (
                            <p className={styles['error-message']}>
                                {loginError.errorMessage}
                            </p>
                        )}

                        <button
                            className={`${styles['button']} ${styles['button-register']}`}
                        >
                            Giriş Yap
                        </button>
                    </form>
                    <p className={styles['form-sub-text']}>
                        Şifrenizi mi unuttunuz?
                    </p>
                    <p className={styles['auth-text']}>
                        Bir hesabınız yok mu?{' '}
                        <Link to='/register'>Kayıt Ol</Link>
                    </p>
                </div>
            </div>
            <div className={styles['auth-img']}>
                <img src={loginImg} alt='' />
            </div>
        </div>
    );
}

export default Login;
