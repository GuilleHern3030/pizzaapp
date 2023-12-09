import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Menu.module.css";

import { title } from "../../data/client-info.json";

// Components
import Header from '../../components/header/Header';
import Footer from "../../components/Footer/Footer";
import ShoppingCart from "../../components/shopping-cart/cart/ShoppingCart";
import Nav from "../../components/menu/nav/ArticlesNav";
import Articles from "../../components/menu/articles/Articles";
import Loading from "../../components/loading/Loading";


export default function Menu() {
    const navigate = useNavigate();

    const { articles } = useSelector(state => state.articles);

    const showTicket = () => { navigate("/menu/ticket") }
    
    return (<>
        <Header pageName={title}>
            <Link to="/menu"> Menu </Link>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
        
        {
            articles === null ? <p className={styles.nodata}> No data </p> : 
            articles === undefined ? <Loading className={styles.loading}/> :
            <>
                <Nav/>
                <ShoppingCart animation={false} onClicked={showTicket}/>
                <Articles/>
            </>
        }

        <Outlet/>

        <Footer copyrigth="©2023 Guillermo Hernandez"/>
    </>);
}