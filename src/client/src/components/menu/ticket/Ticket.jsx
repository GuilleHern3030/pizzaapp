import { useSelector } from "react-redux";
import { getSelectedArticles } from "../../../redux/reducers/articles/articlesSelector";
import { contactLink } from "../../../data/client-info.json";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Ticket.module.css";

const show = { transform: 'translateX(-90vw)' };

export default function Ticket(
        {
            color = "#131313",
            backgroundColor = "#d1cdcd"
        }) {

    const navigate = useNavigate();
    const articles = useSelector(getSelectedArticles());
    const [animation, setAnimation] = useState(undefined);

    useEffect(() => {
        if (articles != undefined) setAnimation(show); 
        else navigate("/menu")
    }, []);

    const [ items, price ] = enlist(articles);

    const handleHelp = () => sendMessage(contactLink);
    const handleBuy = () => sendMessage(contactLink, items, price);

    const closeTicket = (time=310) => {
        setAnimation(undefined);
        setTimeout(() => navigate(-1), time);
    }

    return articles != undefined && (
        <div className={styles.background} onClick={()=>closeTicket()}>
            <div className={styles.container} style={{backgroundColor, color, ...animation}} onClick={e=>e.stopPropagation()}>
                {<ul className={styles.ul}>
                    <li className={styles.listTitle}>Lista de la compra</li>
                    {
                        (articles === undefined || articles.length == 0) ? (
                            <>
                                <li style={{textAlign:'center'}}>Aún no has seleccionado ningún artículo.</li>
                                <li style={{textAlign:'center'}}>¿Necesitas ayuda?</li>
                                <li style={{textAlign:'center'}}><button className={styles.buttonHelp} onClick={handleHelp}>Contáctanos</button></li>
                            </>
                        ) : (
                            <>
                                { items }
                                <li className={styles.listTotal}>Coste total: { parseText(price) }</li>
                                <li className={styles.listOrder}><button className={styles.buttonBuy} onClick={handleBuy}>Pedir</button></li>
                            </>
                        )
                    }
                </ul>}
            </div>
        </div>
    );
}

const enlist = articles => {
    if (articles != undefined) {
        const items = [];
        let price = {};
        for (const article of articles) {
            items.push(<li key={article.id()} className={styles.item}> - {article.name()}: {article.coinSymbol()}{article.price()} x {article.amountSelected()}</li>)
            if (price != undefined && article.price()) {
                if (price[article.coinSymbol()])
                    price[article.coinSymbol()] += Number(article.price());
                else price[article.coinSymbol()] = Number(article.price());
            } else price = undefined;
        } return [ items, price ];
    } return [undefined, undefined]
}

const parseText = (prices) => {
    let text = " ";
    if (prices != undefined) Object.entries(prices).forEach(([coinSymbol, value]) => { text += `${coinSymbol}${value} `; }) 
    else return <li> - * Algunos artículos no tienen precio definido, por lo que el precio total es estimativo</li>
    return text;
}

function sendMessage(contactLink, articleList=undefined, price=undefined) {
    const text = (articleList) ? ticket(articleList, price) : "Estoy en su página web y necesito ayuda.";
    window.open(contactLink + '?text=' + encodeURIComponent(text), '_blank');
}

const ticket = (articles, price) => {
    console.log(articles)
    console.log(price)
    const products = articles.map(article => 
        (Array.isArray(article.props.children)) ? 
        article.props.children.join("") : 
        article.props.children
    ).join("\n");
    let total = ""; 
    Object.entries(price).forEach(([coin, value]) => { total += `${coin}${value} ` });
    const message = "Hola, estoy en su página web y quiero comprar:\n" + products + "\nTotal estimado: " + total;
    console.log(`%c${message}`,"color:black;background:pink;padding:10px;text-align:center");
    return message;
}