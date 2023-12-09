import { Link } from "react-router-dom";
import image from '../../assets/images/defaultImg.webp';
import styles from "./About.module.css";

import Header from '../../components/header/Header';
import Footer from "../../components/Footer/Footer";

import { title } from "../../data/client-info.json";

export default function About() {

    return (<>
        <Header pageName={title}>
            <Link to="/menu"> Menu </Link>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
   
        <main className={styles.main}>
            <section className={styles.top}>
                <article>
                    <h2>Sobre nosotros</h2>
                    <p>¡Bienvenidos a Pizzería Lo de Pica!</p>
                    <p>Somos una pizzería familiar ubicada en la localidad de Sarandí. Desde 2010 hemos estado sirviendo deliciosas pizzas cocinadas en horno de leña, con amor y pasión.</p>
                    <p>Nuestra misión es simple: brindar a nuestros clientes auténticos sabores de la pizza en horno de leña como nunca habían probado.</p>
                </article>
                <article>
                    <h2>Nuestra historia</h2>
                    <p>Hace poco más de una década decidimos cumplir nuestro sueño de fundar nuestra pizzería y poder cocinar las mejores pizzas en horno de leña con nuestra receta familiar.</p>
                    <p>Con una vision y una determinación inquebrantable, abrimos las puertas de nuestro pequeño rincón en Sarandí, en el corazón de nuestro barrio.</p>
                </article>
                <article>
                    <h2>Nuestra comunidad</h2>
                    <p>Amamos profundamente a nuestro barrio y a las personas que lo hacen especial.</p>
                    <p>Creemos que una pizzería no solo debe alimetar el cuerpo, sino también el alma de la comunidad brindando una atención personalizada y empática con cada cliente.</p>
                </article>
                <article>
                    <h2>Visítanos</h2>
                    <p>Te invitamos a venir y experimentar la auténtica pizza al horno de leña en Lo de Pica.</p>
                    <p>Ya sea que quieras venir a buscar una pizza para llevar o prefieras que te la llevemos calentita a tu casa, esperamos que cada visita sea una deliciosa aventura.</p>
                    <p>¡Esperamos verte pronto!</p>
                </article>
            </section>
            
            <section className={styles.bottom}>
                <img src={image}/>
            </section>

        </main>

        <Footer copyrigth="©2023 Guillermo Hernandez"/>
         
    </>);

}