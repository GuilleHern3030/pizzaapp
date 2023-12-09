import { useRef } from "react";
import styles from "./ArticlesNav.module.css";
import { useSelector } from "react-redux";
import { getCategories } from "../../../redux/reducers/articles/articlesSelector";

export default function ArticlesNav(
        { 
            height=100,
            color="#fff", 
            backgroundColor="#2e518b",
            backgroundColorSelected="#5b78a7"
        }) {
            
    const categories = useSelector(getCategories());
    const navRef = useRef();

    return (
        <nav 
        ref={navRef} 
        className={`${styles.nav}`} 
        style={{height:height}}>
            <div 
            className={styles.navContainer}
            style={{backgroundColor, maxHeight:height}}>
                <ul id="nav-ul">
                    { 
                        list(categories, {color}, height) 
                    }
                </ul>
            </div>
        </nav>
    );
}

const fixNavigation = (e, height=100, headerHeight=50) => {
    try {
        const offset = height + headerHeight;
        const htmlElementIdToGo = e.target.getAttribute("href");
        const destiny = document.querySelector(htmlElementIdToGo);
        const scrolled = window.scrollY || window.pageYOffset;
        const posTop = destiny.getBoundingClientRect().y + scrolled;
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        window.scrollTo({ top: posTop - offset, behavior: "smooth" });
    } catch(e) { }
}

const list = (categories, styles, navHeight, headerHeight) => {
    const navElement = [];
    for (let i in categories)
        navElement.push(<li key={i}>
            <a
                style={styles}
                href={`#category-${i}`} 
                onClick={e=>fixNavigation(e,navHeight,headerHeight)}>{categories[i]}
            </a>
        </li>);
    return navElement;
}