import styles from './Input.module.css';

export default function Input(
    {
        id, 
        label,
        labelColor,
        labelFont,
        placeholder,
        color,
        style, 
        name, 
        min,
        max,
        required,
        type="text", 
        multiline=false, 
        columns=1
    }) { 

    return (
        <div className={`${styles.container} ${columns == 2 ? styles.doubleGrid : styles.simpleGrid}`}>
            { label ? <label style={{color:labelColor, fontFamily:labelFont}}>{label}</label> : <></> }
            {
                multiline === false ?
                    <input 
                        className={styles.input} 
                        id={id}
                        style={{...{style}, ...{color}}}
                        type={type} 
                        placeholder={placeholder ? placeholder : ""} 
                        name={name}
                        min={min ? min : "null"}
                        max={max ? max : "null"}
                        required={required}
                    />
                :
                    <textarea 
                        className={styles.input}  
                        id={id} 
                        style={{...{style}, ...{color}}}
                        type={type} 
                        placeholder={placeholder ? placeholder : ""} 
                        name={name}
                        required={required}
                    />
            }
        </div>
    )
}