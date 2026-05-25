import styles from './SinUsuarios.module.css'

const SinUsuarios = () => {
    return (
        <div className={styles.emptyContainer}>
            <span className={styles.emptyIcon}>🗓️</span>
            <h4 className={styles.emptyTitle}>Sin Turnos Agendados</h4>
            <p className={styles.emptyText}>No registras ninguna cita médica activa o cancelada en tu cuenta.</p>
        </div>
    )
}

export default SinUsuarios