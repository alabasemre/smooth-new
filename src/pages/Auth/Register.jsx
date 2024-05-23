import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import { useRegisterMutation } from '../../store/apis/authApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';

const defaultState = {
    name: { hasError: false, errorMessage: '' },
    surname: { hasError: false, errorMessage: '' },
    email: { hasError: false, errorMessage: '' },
    password: { hasError: false, errorMessage: '' },
    checkPassword: { hasError: false, errorMessage: '' },
};

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const [formState, setFormState] = useState({
        name: { hasError: false, errorMessage: '' },
        surname: { hasError: false, errorMessage: '' },
        email: { hasError: false, errorMessage: '' },
        password: { hasError: false, errorMessage: '' },
        checkPassword: { hasError: false, errorMessage: '' },
    });
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormState(defaultState);

        if (name.trim().length == 0) {
            setFormState((state) => {
                return {
                    ...state,
                    name: {
                        hasError: true,
                        errorMessage: 'Lütfen adınızı girin',
                    },
                };
            });
        }
        if (surname.trim().length == 0) {
            setFormState((state) => {
                return {
                    ...state,
                    surname: {
                        hasError: true,
                        errorMessage: 'Lütfen soyadınızı girin',
                    },
                };
            });
        }

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

        try {
            const res = await register({
                name,
                surname,
                email,
                password,
            }).unwrap();
            dispatch(login({ ...res }));
        } catch (error) {
            console.log(error);
        }
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
                            value={name}
                            onChange={setName}
                            type='text'
                            id='name'
                            name='name'
                            label='Adınız'
                            hasError={formState?.name.hasError}
                            errorMessage={formState.name.errorMessage}
                        />
                        <Input
                            value={surname}
                            onChange={setSurname}
                            type='text'
                            id='surname'
                            name='surname'
                            label='Soyadınız'
                            hasError={formState?.surname.hasError}
                            errorMessage={formState.surname.errorMessage}
                        />
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
                            label='Şifrenizi Onaylayın'
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
