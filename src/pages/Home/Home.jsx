import styles from './Home.module.css';
import heroImg from '../../assets/hero.png';

import Logo from '../../components/Logo/Logo';
import AuthButtons from './AuthButtons';
function Home() {
    return (
        <main className={styles['centered-container']}>
            <div className={styles.topbar}>
                <Logo />
                <AuthButtons />
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
