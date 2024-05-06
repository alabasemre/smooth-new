import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';
import { useRef, useState } from 'react';

const defaultState = {
    email: { hasError: false, errorMessage: '' },
    password: { hasError: false, errorMessage: '' },
    passwordConfirm: { hasError: false, errorMessage: '' },
};

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [formState, setFormState] = useState({
        email: { hasError: false, errorMessage: '' },
        password: { hasError: false, errorMessage: '' },
        passwordConfirm: { hasError: false, errorMessage: '' },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        setFormState(defaultState);

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        if (password.trim().length == 0) {
            setFormState((state) => {
                return {
                    ...state,
                    password: {
                        hasError: true,
                        errorMessage: 'Şifre Boş Bırakılamaz',
                    },
                };
            });
        }

        if (password.trim() !== passwordConfirm.trim()) {
            setFormState((state) => {
                return {
                    ...state,
                    passwordConfirm: {
                        hasError: true,
                        errorMessage: 'Şifreler uyuşmuyor',
                    },
                };
            });
        }

        const userData = {
            email,
            password,
            passwordConfirm,
        };

        console.log(userData);
    };

    return (
        <div className={styles['auth-container']}>
            <div className={styles['auth-content']}>
                <Logo />
                <div className={styles['auth-form-container']}>
                    <h3 className={styles['auth-form-title']}>
                        Hesap Oluşturun
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
                            {formState?.email.hasError && (
                                <p className={styles['error-message']}>
                                    {formState.email.errorMessage}
                                </p>
                            )}
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor='password'>Şifre</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                ref={passwordRef}
                            />
                            {formState?.password.hasError && (
                                <p className={styles['error-message']}>
                                    {formState.password.errorMessage}
                                </p>
                            )}
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor='password-confirm'>Şifre Onay</label>
                            <input
                                type='password'
                                name='pass-confirm'
                                id='pass-confirm'
                                ref={passwordConfirmRef}
                            />
                            {formState?.passwordConfirm.hasError && (
                                <p className={styles['error-message']}>
                                    {formState.passwordConfirm.errorMessage}
                                </p>
                            )}
                        </div>

                        <button
                            className={`${styles['button']} ${styles['button-register']}`}
                        >
                            Kayıt Ol
                        </button>
                    </form>
                    <p className={styles['form-sub-text']}>
                        Hesap oluşturma işlemi ile beraber şartlar ve koşulları
                        kabul etmiş olursunuz.
                    </p>
                    <p className={styles['auth-text']}>
                        Zaten bir hesabınız var mı?{' '}
                        <Link to='/login'>Giriş Yap</Link>
                    </p>
                </div>
            </div>
            <div className={styles['auth-img']}></div>
        </div>
    );
}

export default Register;
