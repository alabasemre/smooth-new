import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import styles from './Auth.module.css';

import loginImg from '../../assets/login.png';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { useLoginMutation } from '../../store/apis/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState({
        hasError: false,
        errorMessage: '',
    });

    const dispatch = useDispatch();
    const [loginMutation, { isLoading }] = useLoginMutation();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoginError({
            hasError: false,
            errorMessage: '',
        });
        // TODO: Add validation
        if (email.length === 0) {
            setLoginError({
                hasError: true,
                errorMessage: 'E-Posta Adresinizi Girin',
            });
        }

        try {
            const res = await loginMutation({ email, password }).unwrap();
            dispatch(login({ ...res }));
        } catch (error) {
            console.log(error);
        }

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
                        <Input
                            value={email}
                            onChange={setEmail}
                            type='text'
                            id='email'
                            name='email'
                            label='E-Posta Adresi'
                        />
                        <Input
                            value={password}
                            onChange={setPassword}
                            type='password'
                            id='password'
                            name='password'
                            label='Şifre'
                        />

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
