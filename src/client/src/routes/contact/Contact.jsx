import { Link } from "react-router-dom"
import styles from "./Contact.module.css"
import data from '../../data/client-info.json'

// Images
import whatsapp from "../../assets/icons/whatsapp-icon.webp";
import facebook from "../../assets/icons/facebook-icon.webp";
import instagram from "../../assets/icons/instagram-icon.webp";
import twitter from "../../assets/icons/twitter-icon.webp";

// Components
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

export default () => {
    
    return <>

        <Header 
            pageName={data.title}
            colorOnScroll='#1f1f1fff'
            changeBackgroundOnScroll={true}>
            <Link to="/menu"> Menu </Link>
            <Link to="/about"> Nosotros </Link>
            {/* <Link to="/gallery"> Galería </Link> */}
            <Link to="/contact"> Contacto </Link>
        </Header>

        <main className={styles.main}>
            <section className={styles.sectionwhite}>
                
                <article className={styles.article} style={{backgroundColor:"#dcd9d9ff"}}>
                    <p className={styles.title}><span>Medio de contacto</span></p>
                    <p>Podés contactarnos a través de nuestro WhatsApp</p>
                    <a target="_BLANK" href={data.contactLink}><img className={`${styles.icon} ${styles.preferredcontact}`} src={whatsapp}/></a>
                </article>
                
                <article className={styles.article} style={{backgroundColor:"#c9c3c3"}}>
                    <p className={styles.title}><span>Nuestras redes sociales</span></p>
                    <p>También podés encontrarnos en nuestras redes sociales</p>
                    <div className={styles.social}>
                        { data.facebook ? <a target="_BLANK" href={data.facebook}><img className={styles.icon} src={facebook}/></a> : <></> }
                        { data.instagram ? <a target="_BLANK" href={data.instagram}><img className={styles.icon} src={instagram}/></a> : <></> }
                        { data.twitter ? <a target="_BLANK" href={data.twitter}><img className={styles.icon} src={twitter}/></a> : <></> }
                    </div>
                </article>
                
                <article className={styles.article} style={{backgroundColor:"#dcd9d9ff"}}>
                    <p className={styles.title}><span>Correo electrónico</span></p>
                    <p>O contactarnos por email</p>
                    <a className={styles.email} aria-label="email" href={`mailto:${data.email}?subject=CenitEspecias"`}>{data.email}</a>

                </article>

            </section>

        </main>

        <Footer/>

    </>
}