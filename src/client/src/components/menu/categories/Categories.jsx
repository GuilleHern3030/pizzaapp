import { useEffect, useState } from "react";
import ArticleElement from "../article/Article";
import styles from "./Categories.module.css";

const parseJsxArticles = (articles) => {
    const jsxArticles = [];
    for (let i in articles)
        jsxArticles.push(<ArticleElement key={i} article={articles[i]}/>);
    return jsxArticles;
}

export default function Category({articles, title, index}) {

    const [jsxArticles, setJsxArticles] = useState();
    useEffect(() => { setJsxArticles(parseJsxArticles(articles)) }, []);

    return (
        <div id={`category-${index}`} className={styles.articleCategory}>
            <p className={styles.articleCategoryTitle}>{title}</p>
            <>{jsxArticles}</>
        </div>
    );
}