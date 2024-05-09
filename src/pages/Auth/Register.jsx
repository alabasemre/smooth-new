import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';
import { useState } from 'react';
import Input from './AuthInput';

const defaultState = {
    email: { hasError: false, errorMessage: '' },
    password: { hasError: false, errorMessage: '' },
    checkPassword: { hasError: false, errorMessage: '' },
};

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const [formState, setFormState] = useState({
        email: { hasError: false, errorMessage: '' },
        password: { hasError: false, errorMessage: '' },
        checkPassword: { hasError: false, errorMessage: '' },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setFormState(defaultState);

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

        if (password.trim() !== checkPassword.trim()) {
            setFormState((state) => {
                return {
                    ...state,
                    checkPassword: {
                        hasError: true,
                        errorMessage: 'Şifreler uyuşmuyor',
                    },
                };
            });
        }

        const userData = {
            email,
            password,
            checkPassword,
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
                        <Input
                            value={email}
                            onChange={setEmail}
                            type='text'
                            id='email'
                            name='email'
                            label='E-Posta Adresi'
                            hasError={formState?.email.hasError}
                            errorMessage={formState.email.errorMessage}
                        />

                        <Input
                            value={password}
                            onChange={setPassword}
                            type='password'
                            id='password'
                            name='password'
                            label='Şifre'
                            hasError={formState?.password.hasError}
                            errorMessage={formState.password.errorMessage}
                        />

                        <Input
                            value={checkPassword}
                            onChange={setCheckPassword}
                            type='password'
                            id='checkPassword'
                            name='checkPassword'
                            label='Şifre'
                            hasError={formState?.checkPassword.hasError}
                            errorMessage={formState.checkPassword.errorMessage}
                        />

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
