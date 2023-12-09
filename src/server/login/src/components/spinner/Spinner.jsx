import styles from "./Spinner.module.css";

export default function Spinner({defaultValue="", optionList, selectedOption, onSelectOption, width='85vw'}) {
    const handleSelectChange = (event) => onSelectOption(event.target.value)
    return (
        <div className={styles.spinner} style={{maxWidth: width}}>
            <label htmlFor="opciones">Select: </label>
            <select 
                id="opciones" 
                name="opciones" 
                value={selectedOption != null ? selectedOption : ""} 
                onChange={handleSelectChange} 
                style={{maxWidth: width}}
            >
                <option value=""></option>
                { optionList }
            </select>
        </div>
    );
}