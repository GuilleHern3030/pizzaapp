import styles from "./Spinner.module.css";

export default function Spinner(
        {
            defaultValue="", 
            optionList, 
            selectedOption,    
            onSelectOption, 
            width='85vw'
        }) {
    const list = optionList.map((option, index) => <option key={index} value={index}>{option}</option>)
    const handleSelectChange = (event) => onSelectOption(event.target.value)
    return (
        <div className={styles.spinner} style={{width}}>
            <label htmlFor="options"></label>
            <select 
                id="options" 
                name="options" 
                value={selectedOption != null ? selectedOption : defaultValue} 
                onChange={handleSelectChange} 
                style={{width}}
            >
                <option value=""></option>
                { list }
            </select>
        </div>
    );
}