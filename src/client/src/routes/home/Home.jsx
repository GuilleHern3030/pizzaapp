import { Link } from "react-router-dom";

import Header from '../../components/header/Header';
import ShowCaseItem from '../../components/showcase/item/ShowCaseItem';
import ShowCase from "../../components/showcase/container/ShowCase";
import Footer from "../../components/Footer/Footer";

import banner from "../../assets/images/banner2.jpg";
import imageFirst from "../../assets/images/pizza.webp";
import imageSecond from "../../assets/images/horno.webp";
import imageThird from "../../assets/images/empanada.webp";
import imageFourth from "../../assets/images/faina.webp";
import imageFifth from "../../assets/images/keseso.webp";
import imageSixth from "../../assets/images/milanesa.webp";

import { title } from "../../data/client-info.json";

import styles from './Home.module.css';

export default function Home() {
    return (<>
        <Header 
            image={banner}
            pageName={title}
            title="Pizzas, empanadas & otras delicias"
            subtitle="Miércoles a domingo de 19 a 23hs"
            titleColor="#fff"
            subtitleColor="#fff"
            changeBackgroundOnScroll={true}>
            <Link to="/menu"> Menu </Link>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
        <h3 className={styles.slogan}>Las mejores pizzas y empanadas de Sarandí</h3>
        <ShowCase>
            <ShowCaseItem
                title="Con la mejor masa"
                description="Elegimos la masa para pizza de mejor calidad para ser cocida en nuestro horno de leña para dejar un sabor exquisito junto con una presentación elegante."
                image={imageFirst}
                alt="Pizza"
            />
            <ShowCaseItem 
                title="¿Faina en horno de barro?"
                description="Así es, no olvide también probar nuestra faina."
                image={imageSecond}
                alt="Faina"
            />
            <ShowCaseItem 
                title="Variedad en empanadas"
                description="También puede degustar de empanadas cocidas en horno de barro, o si lo prefiere, unas clásicas empanadas fritas."
                image={imageThird}
                alt="Empanada"
            />
            <ShowCaseItem 
                title="Cocinado en horno de barro"
                description="Todas nuestras preparaciones se realizan en horno de barro, lo cual le da una cocción equilibrada y con un gusto único."
                image={imageFourth}
                alt="Horno"
            />
            <ShowCaseItem 
                title="Preparaciones especiales"
                description="Puede probar otras formas de pizza cocidas en horno de barro. Pruebe a variar un poco."
                image={imageFifth}
                alt="Preparacion"
            />
            <ShowCaseItem 
                title="Milanesas y embutidos"
                description="Pruebe nuestros sabores de pizzas, ahora en milanesas."
                image={imageSixth}
                alt="Milanesa"
            />
        </ShowCase>
        <Footer copyrigth="©2023 Guillermo Hernandez"/>
    </>);
}