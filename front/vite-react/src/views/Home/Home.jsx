import { useState } from 'react'
import texts from '../../helpers/texts'
import styles from './Home.module.css'
import TextImg from '../../components/TextImg/TextImg'

const Home = () => {
    const [stringsToShow,setStringsToShow]=useState(texts)
    return (
        <div className={styles.caja}>
            <h1 className={styles.subtitle}>Home (titulo)</h1>

            {
                stringsToShow.map(text=>{
                    return <TextImg key={text.id}  text={text.contenido}/>
                })
            }           

        </div>


    )
}

export default Home