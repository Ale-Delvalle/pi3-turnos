import styles from './TextImg.module.css'

const TextImg = ({text, imagen}) => {
    // Intentar separar el título del contenido usando ":"
    const hasColon = text.includes(':');
    let title = '';
    let bodyText = text;
    
    if (hasColon) {
        const parts = text.split(':');
        title = parts[0].trim();
        bodyText = parts.slice(1).join(':').trim();
    }

    return (
        <div className={styles.card}>
            <div className={styles.imgWrapper}>
                <img src={imagen} alt={title || "Información de Salud"} className={styles.img} />
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.cardContent}>
                {title && <h3 className={styles.cardTitle}>{title}</h3>}
                <p className={styles.cardText}>{bodyText}</p>
            </div>
        </div>
    )
}

export default TextImg