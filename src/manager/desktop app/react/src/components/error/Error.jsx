import styles from './Error.module.css'

export default function Error({error}) {
    console.log(error)

    return <main className={styles.main}>
        <p className={styles.errorMessage}> { typeof error === 'string' ? error : JSON.stringify(error) } </p>
    </main>
}