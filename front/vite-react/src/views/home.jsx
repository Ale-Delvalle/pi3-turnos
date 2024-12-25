import { useState } from 'react'
import texts from '../helpers/texts'
import styles from './Home.module.css'
import TextImg from '../components/TextImg/TextImg'

const Home = () => {
    const [stringsToShow,setStringsToShow]=useState(texts)
    return (
        <>
            <h1 className={styles.subtitle}>Home (titulo)</h1>
            <div className={styles.containerTextImg}>
            {
                stringsToShow.map(text=>{
                    return <TextImg text={text}/>
                })
            }           
            </div>
        </>
    )
}

export default Home