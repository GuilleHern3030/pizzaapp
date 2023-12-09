import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ArticleSummary.module.css";

import defaultImg from '../../../assets/images/defaultimg.webp';
import { fixImageURL } from "../article/Article";

// Redux
import { useSelector } from "react-redux";
import { getArticle } from "../../../redux/reducers/articles/articlesSelector";

const show = { transform: 'translateY(-90vh)' };

export default function ArticleSummary({ backgroundColor = "#f5eded" }) {
    const { id } = useParams();
    const article = useSelector(getArticle(id));

    const navigate = useNavigate();

    const [image, setImage] = useState();
    const [animation, setAnimation] = useState(undefined);

    useEffect(() => { 
        if (article != undefined) {
            setImage(article.img())
            setAnimation(show); 
        } else navigate("/menu") 
    }, []);

    const handleImageError = () => { setImage(defaultImg); }

    const closeSummary = time => {
        setAnimation(undefined);
        setTimeout(() => navigate(-1), time);
    }

    return article != undefined && (
        <div className={styles.background} onClick={()=>closeSummary(310)}>
            <div className={styles.container} style={{backgroundColor, ...animation}} onClick={e=>e.stopPropagation()}>
                <p className={styles.name}>{article.name()}</p>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={fixImageURL(image)} alt={article.name()} onError={handleImageError}/>
                </div>
                { article.outOfStock() ? <p className={styles.outofstock}>Sin stock</p> : <></> }
                { article.description() ? <p className={styles.description}>{article.description()}</p> : <></> }
                { article.details() ? <p className={styles.details}>{article.details()}</p> : <></> }
                { article.price() ? <p className={styles.price}>{`${article.coinSymbol()}${article.price()}`}</p> : <></> }
            </div>
        </div>
    );
}