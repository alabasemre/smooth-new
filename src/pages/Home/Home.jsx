import styles from './home.module.css';
import heroImg from '../../assets/hero.png';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
function Home() {
    return (
        <main className={styles['centered-container']}>
            <div className={styles.topbar}>
                <Logo />
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
            </div>

            <section className={styles['hero']}>
                <h1 className={styles['hero-header']}>
                    <span>Smooth</span> ile Projenizi Kolayca ve
                    <br /> Verimli Şekilde
                    <span> Yönetin</span>
                </h1>
                <p className={styles['hero-text']}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Corporis officia ipsum iste nulla pariatur magni sit
                    molestiae sapiente ratione! Voluptatum ipsa maxime expedita,
                    libero sapiente reprehenderit perferendis ut eum natus
                    aliquam quo qui enim fugiat in sint! Accusantium, optio
                    beatae!
                </p>

                <div className={styles['hero-img']}>
                    <img src={heroImg} alt='' />
                </div>
            </section>
        </main>
    );
}

export default Home;
