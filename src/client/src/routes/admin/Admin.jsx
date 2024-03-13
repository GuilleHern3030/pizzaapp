import { useState } from "react";
import { useSelector } from "react-redux";

import { title } from "../../data/client-info.json";
import { credits } from "../../data/routes.json";

import styles from "./Admin.module.css";

// Components
import Header from '../../components/header/Header';
import Footer from "../../components/Footer/Footer";
import Login from "../../components/login/Login";
import Articles from "../../components/admin/articles/Articles";
import Messages from "../../components/admin/messages/Messages";

export default function Admin() {

    const [ authenticated, setAuthenticated ] = useState(false)
    const [ view, setView ] = useState(<Articles/>)
    const { articles } = useSelector(state => state.articles);

    return (<>
        <Header pageName={title}>
            <button onClick={() => setView(<Articles/>)}>Articles</button>
            <button onClick={() => setView(<Messages/>)}>Messages</button>
        </Header>
        
        { 
            articles === null ? <p className={styles.nodata}> No data </p> : 
            articles === undefined ? <p className={styles.nodata}> Cargando ... </p> :
            authenticated == false ? <Login authenticated={authenticated} setAuthenticated={setAuthenticated}/> :
            view
        }

        <Footer copyrigth="©2023 Guillermo Hernandez" copyrightHref={credits}/>

    </>);
}