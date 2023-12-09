import { useSelector } from "react-redux";
import { getSelectedArticles } from "../../../redux/reducers/articles/articlesSelector";
import { contactLink } from "../../../data/client-info.json";

import styles from "./Ticket.module.css";

export default function Ticket(
        {
            showed, 
            color = "#131313",
            backgroundColor = "#8e8f6a", 
            iconBackgroundColor = "#d5d5a7"
        }) {

    const articles = useSelector(getSelectedArticles());
    const [ items, price ] = enlist(articles);

    const handleHelp = () => sendMessage(contactLink);
    const handleBuy = () => sendMessage(contactLink, items, price);

    return (
        <ul 
        className={`${styles.ul} ${showed === true ? styles.shoppingcartContent__active : showed === false ? styles.shoppingcartContent__inactive : ""}`}
        style={showed !== undefined ? {display: "flex", color, backgroundColor} : {}}
        >
            <li className={styles.listTitle}>Lista de la compra</li>
            {
                showed ? (
                    (articles === undefined || articles.length == 0) ? (
                        <>
                            <li>Aún no has seleccionado ningún artículo.</li>
                            <li>¿Necesitas ayuda? Contáctanos  <button className={styles.buttonHelp} onClick={handleHelp}>presionando aquí</button></li>
                        </>
                    ) : (
                        <>
                            { items }
                            <li className={styles.listTotal}>Coste total: { parseText(price) }</li>
                            <li className={styles.listOrder}><button className={styles.buttonBuy} onClick={handleBuy}>Pedir</button></li>
                        </>
                    )
                ) : <></>
            }
        </ul>
    );
}

const enlist = articles => {
    const items = [];
    let price = {};
    for (const article of articles) {
        items.push(<li key={article.id()}> - {article.name()}: {article.coinSymbol()}{article.price()} x {article.amountSelected()}</li>)
        if (price != undefined && article.price()) {
            if (price[article.coinSymbol()])
                price[article.coinSymbol()] += Number(article.price());
            else price[article.coinSymbol()] = Number(article.price());
        } else price = undefined;
    }
    return [ items, price ];
}

const parseText = (prices) => {
    let text = " ";
    if (prices != undefined) Object.entries(prices).forEach(([coinSymbol, value]) => { text += `${coinSymbol}${value} `; }) 
    else return <li> - * Algunos artículos no tienen precio definido, por lo que el precio total es estimativo</li>
    return text;
}

function sendMessage(contactLink, articleList=undefined, price=undefined) {
    const text = (articleList) ? ticket(articleList) : "Estoy en su página web y necesito ayuda.";
    window.open(contactLink + '?text=' + encodeURIComponent(text), '_blank');
}

const ticket = articles => {
    const products = articles.map(article => 
        (Array.isArray(article.props.children)) ? 
        article.props.children.join("") : 
        article.props.children
    ).join("\n");
    const message = "Hola, estoy en su página web y quiero comprar:\n" + products;
    console.log(`%c${message}`,"color:black;background:pink;padding:10px;text-align:center");
    return message;
}