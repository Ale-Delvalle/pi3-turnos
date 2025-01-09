import styles from './TextImg.module.css'

const TextImg = ({text, imagen}) => {
    return (
        <div className={styles.containerTextImg}>
            <img src={imagen} alt="Imagen del artículo" />
            <p>{text}</p>
        </div>
    )
}

export default TextImg