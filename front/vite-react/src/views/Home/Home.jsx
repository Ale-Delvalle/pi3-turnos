import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import texts from '../../helpers/texts'
import styles from './Home.module.css'
import TextImg from '../../components/TextImg/TextImg'
import { UserDataContext } from '../../context/User'
import heroImg from '../../imgs/hero_medical_illustration.png'

const Home = () => {
    const [stringsToShow, setStringsToShow] = useState(texts)
    const { isLoggedIn } = useContext(UserDataContext)

    return (
        <div className={`${styles.container} animate-fade-in-up`}>
            {/* Sección Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.brandTitle}>Clínica <span>San Sebastián</span></h1>
                    <span className={styles.tagline}>Portal de Turnos Oficial</span>
                    <h2 className={styles.heroTitle}>Tu bienestar, en manos profesionales</h2>
                    <p className={styles.heroSubtitle}>
                        Reserva, consulta y gestiona tus turnos médicos en Clínica San Sebastián de manera rápida, confiable y 100% online.
                    </p>
                    <div className={styles.heroActions}>
                        {isLoggedIn && (
                            <Link to="/MisTurnos" className={styles.btnPrimary}>
                                Gestionar Mis Turnos →
                            </Link>
                        )}
                    </div>
                </div>
                <div className={styles.heroImageContainer}>
                    <img src={heroImg} alt="Clínica San Sebastián" className={styles.heroImage} />
                </div>
            </section>

            {/* Sección de Tarjetas de Información */}
            <section className={styles.infoSection}>
                <div className={styles.infoHeading}>
                    <h2 className={styles.infoTitle}>Atención Médica de Calidad</h2>
                    <p className={styles.infoSubtitle}>Conoce más sobre nuestro compromiso con tu salud y bienestar diario.</p>
                </div>
                <div className={styles.infoGrid}>
                    {stringsToShow.map(text => (
                        <TextImg key={text.id} text={text.contenido} imagen={text.imagen} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home