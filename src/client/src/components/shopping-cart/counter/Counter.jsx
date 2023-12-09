import styles from "./Counter.module.css"

export default function Counter ({ amount=0, size, position }) {
    return amount === 0 ? <></> : (
        <div className={styles.counterContainer} style={position}>
            <p 
                className={styles.counterAmount}
                style={fontSize(amount, size)}
                >{ amount > 99 ? "+99" : amount }
            </p>
        </div>
    )
}

const fontSize = (amount, size) => {
    if (amount.toString().length > 2) return { fontSize: 14 * size }
    else return { fontSize: 18 * size }
}