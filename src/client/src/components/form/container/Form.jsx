import { useState } from "react";
import styles from "./Form.module.css";
//import Input from "../input/Input";

export default function Form(
        {
            id, 
            children, 
            style, 
            title, // text in top of the form
            titleColor='#fff', // Color del título
            warnMessage, // Si se define, se muestra un mensaje de warning 
            warnColor='#000', // Color dle texto del mensaje de warning
            submitBackgroundColor='#ffe4c4', // Color del fondo del botón submit
            submitColor='#000', // Color del texto del botón submit
            submitText="Send", // text in submit button
            submitDisabled, // Deshabilita el botón submit
            submitHidden, // Oculta el botón submit
            submitHoverStyle={transform:'scale(1.1)'}, // Estilo del botón submit al hacer focus
            submitPreventReload=true,
            onSubmit // callback (e, inputs)
        }) {

    const inputs = children// ? children.filter(input => input.type === Input) : [];

    const [ submitHover, setSubmitHover ] = useState(false)

    const submitCallback = e => {
        if (submitPreventReload === true) e.preventDefault()
        let inputs = {}, i = 0
        for (const input of e.target) {
            if (input.nodeName === "INPUT" || input.nodeName === "TEXTAREA")
                input.name ? 
                    inputs[input.name] = input.value :
                    inputs[i] = input.value
            i++;
        }        
        return onSubmit(e, inputs);
    }

    return (
        <div className={styles.container} style={ style ? style : {} }>
            <form id={id ? id : "form"} className={styles.form_id} onSubmit={submitCallback}>
                <fieldset>
                    <legend style={{color:titleColor}}>{title}</legend>
                
                    <div className={styles.inputContainer}> {inputs} </div>
                
                    <div className={ warnMessage ? {} : styles.hidden }>
                        <p className={styles.warning} style={{color:warnColor}}>{ typeof warnMessage === 'string' ? warnMessage : "* You must complete all fields"}</p>
                    </div>
                
                    { submitHidden ||
                        <div className={styles.submitContainer}>
                            { submitDisabled ? 
                                <button disabled={true}>{submitText}</button> :
                                <button 
                                    style={ submitHover ? submitHoverStyle : {} && {...{color:submitColor, backgroundColor:submitBackgroundColor}} }
                                    onMouseEnter={()=>setSubmitHover(true)}
                                    onMouseLeave={()=>setSubmitHover(false)}
                                >{submitText}</button>
                            }
                        </div>
                    }
            
                </fieldset>
            </form>
        </div>
    );
}