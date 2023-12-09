import styles from './ShowCase.module.css';

export default function ShowCase ({children}) {
    return <section className={styles.showcase}> { children } </section>
}