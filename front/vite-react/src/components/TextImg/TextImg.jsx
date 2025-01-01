import styles from './TextImg.module.css'

const TextImg = ({text}) => {
    return (
        <div className={styles.containerTextImg}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKwPV7qzlhjI2x0KwFOcaQrZX9N4QRuXYYA&s" alt="Imagen del artículo" />
            <p>{text}</p>
        </div>
    )
}

export default TextImg