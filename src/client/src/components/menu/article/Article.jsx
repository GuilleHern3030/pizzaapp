import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelection } from "../../../redux/reducers/articles/articlesSlice";

import defaultImg from '../../../assets/images/defaultimg.webp';
import { basename as root } from '../../../data/routes.json';

import { useNavigate } from "react-router-dom";

import styles from "./Article.module.css";

export default function Article({article}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [amount, setAmount] = useState(0);

    const handleChange = e => { e.stopPropagation(); setAmount(Number(e.nativeEvent.data)); }
    const handleImageError = e => { e.preventDefault(); e.target.onerror = null; e.target.src = defaultImg; }
    const handleClickPlus = e => { e.stopPropagation(); if (article.amount() > 0 && amount < article.amount() || article.amount() === 0) setAmount(amount + 1); }
    const handleClickMinus = e => { e.stopPropagation(); if (amount > 0) setAmount(amount - 1); }
    const handleArticleClicked = e => { 
        e.stopPropagation(); 
        navigate("/menu/article/"+article.id())
    }

    useEffect(() => { dispatch(setSelection({ "id": article.id(), "amount": amount })) }, [amount]);

    return (<>
        <article id={`article-${article.id()}`} className={styles.article} onClick={handleArticleClicked}  style={article.outOfStock()?{transform:"none"}:{cursor:"pointer"}}>
            { article.outOfStock() ? <div className={styles.articleOut} style={{position: 'absolute'}}>Sin stock</div> : <></> }
            <div className={styles.articleImg}>
                <div>
                    <img src={fixImageURL(article.img())} alt={article.name()} onError={handleImageError}/>
                </div>
                { article.amount() > 0 ? <p className={styles.articleAmount}>{article.amount()} restantes</p> : <></>}
            </div>
            <div className={styles.articleInfo}>
                <p className={styles.articleInfoName}>{article.name()}</p>
                { article.register() ? <p className={styles.articleInfoRegister}>{article.register()}</p> : <></> }
                { article.description() ? <p className={styles.articleInfoDescription}>{article.description()}</p> : <></> }
                <p className={styles.articleInfoPrice}>{`${article.coinSymbol()} ${article.price()}`}</p>
            </div>
            <div className={styles.articleButtons} id={`article-buttons-${article.id()}`}>
                <button onClick={handleClickPlus} className={styles.articleButtonsAddition} style={article.outOfStock()?{opacity:"0"}:{}} disabled={article.outOfStock()}>+</button>
                <input 
                    id={`input-article-${article.id()}`} 
                    className={styles.articleButtonsInput} 
                    type="number" 
                    required=""
                    disabled={article.outOfStock()}
                    value={amount} 
                    min="0" 
                    max="null" 
                    onChange={handleChange}
                    onClick={e=>e.stopPropagation()}
                    style={ article.outOfStock() ? {opacity:"0"} : {}}/>
                <button onClick={handleClickMinus} className={styles.articleButtonsSubstract} style={article.outOfStock()?{opacity:"0"}:{}} disabled={article.outOfStock()}>-</button>
            </div>
        </article>
    </>);
}

export const fixImageURL = src => {
    try {
        let fixedSrc = src;
        if (src.includes("http")) fixedSrc = src;
        else if (src === defaultImg) fixedSrc = src;
        //else if (!src.includes(".webp")) fixedSrc = `${root}/assets/${src}.webp`;
        else fixedSrc = `${root}/assets/` + src;
        return fixedSrc;
    } catch(e) { return undefined }
}