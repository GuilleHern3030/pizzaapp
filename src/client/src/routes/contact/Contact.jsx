import { Link } from "react-router-dom";
import { useState } from "react";

import Header from '../../components/header/Header';
import Footer from '../../components/Footer/Footer';
import Form from "../../components/form/container/Form";
import Input from "../../components/form/input/Input";

import whtasappIcon from '../../assets/icons/whatsapp-icon.webp';
import gmailIcon from '../../assets/icons/gmail-icon.webp';

import styles from "./Contact.module.css";

import { contactLink, title, contactForm, email } from "../../data/client-info.json";
import { credits } from "../../data/routes.json";

import { postMessage } from "../../api/messages";

export default function Contact() {

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitText, setSubmitText] = useState("Enviar");

    const handleClick = async(e, inputs) => {
        e.preventDefault();
        setSubmitDisabled(true);
        setSubmitText("Enviando...");
        try {
            await postMessage(inputs);
            setSubmitText("Enviado!")
        } catch (e) {
            setSubmitText("Error")
            console.warn(e)
        }
    }

    return (<>
        <Header pageName={title}>
            <Link to="/menu"> Menu </Link>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
   
        <div className={styles.contact}>
            <p className={styles.instructions}>Hola! Muchas gracias por visitarnos.</p>

            { contactForm === true ? <>

                <p className={styles.instructions}>Para dejarnos un mensaje puedes llenar el siguiente formulario:</p>
                <div className={styles.form}>
                    <Form 
                    title="Déjanos un mensaje" 
                    submitText={submitText} 
                    onSubmit={handleClick} 
                    submitDisabled={submitDisabled}
                    submitHoverStyle={{borderColor: '#646cff', backgroundColor:'#fff4f4'}}
                    >
                        <Input id="input-name" label="Nombre" placeholder="Tu nombre" name="name"/>
                        <Input id="input-email" label="Email" placeholder="Tu email" name="email"/>
                        <Input id="input-phone" label="Teléfono" placeholder="Tu número" name="telefono" columns={2}/>
                        <Input id="input-message" label="Mensaje" placeholder="Tu mensaje" name="message" columns={2} multiline={true} required={true}/>
                    </Form>
                </div>

            </> : <>
                <p className={styles.instructions}>Puedes contactarnos por medio de nuestro correo electrónico:</p>
                <div className={styles.gmail}>
                    <div className={styles.wame_animation}>
                        <a aria-label="email" href={`mailto:${email}?subject=Contact from ${title}`}><img src={gmailIcon} alt="Gmail"/></a>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </>
            
            }

            <p className={styles.instructions}>O, si deseas, puedes escribirnos a nuestro whatsapp:</p>
            <div className={styles.wame}>
                <div className={styles.wame_animation}>
                    <a href={contactLink}><img src={whtasappIcon} alt="Whatsapp"/></a>
                </div>
            </div>
            
        </div>

        <Footer copyrigth="©2023 Guillermo Hernandez" copyrightHref={credits}/>
         
    </>);
}