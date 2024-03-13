import { Link } from "react-router-dom";
import image from '../../assets/images/about-image.webp';
import styles from "./About.module.css";

import Header from '../../components/header/Header';
import Footer from "../../components/Footer/Footer";

import { title } from "../../data/client-info.json";
import { credits } from "../../data/routes.json";

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
                    <p>¡Bienvenidos a { title }</p>
                    <p>Somos un restaurante familiar ubicado en la localidad de Avellaneda. Desde 2010 hemos estado sirviendo deliciosas comidas cocinadas con amor y pasión.</p>
                    <p>Nuestra misión es simple: brindar a nuestros clientes auténticos sabores tradicionales y caseros como nunca habían probado.</p>
                </article>
                <article>
                    <h2>Nuestra historia</h2>
                    <p>Hace poco más de una década decidimos cumplir nuestro sueño de fundar nuestro local de comidas y poder cocinar las mejores preparaciones con nuestra receta familiar.</p>
                    <p>Con una vision y una determinación inquebrantable, abrimos las puertas de nuestro pequeño rincón en Avellaneda, en el corazón de nuestro barrio.</p>
                </article>
                <article>
                    <h2>Nuestra comunidad</h2>
                    <p>Amamos profundamente a nuestro barrio y a las personas que lo hacen especial.</p>
                    <p>Creemos que no solo se debe alimentar el cuerpo, sino también el alma de la comunidad brindando una atención personalizada y empática con cada cliente.</p>
                </article>
                <article>
                    <h2>Visítanos</h2>
                    <p>Te invitamos a venir y experimentar el auténtico sabor tradicional.</p>
                    <p>Ya sea que quieras venir a buscar una comida para llevar o prefieras que te la llevemos calentita a tu casa, esperamos que cada visita sea una deliciosa aventura.</p>
                    <p>¡Esperamos verte pronto!</p>
                </article>
            </section>
            
            <section className={styles.bottom}>
                <img className={styles.bottomImg} src={image}/>
            </section>

        </main>

        <Footer copyrigth="©2023 Guillermo Hernandez" copyrightHref={credits}/>
         
    </>);

}