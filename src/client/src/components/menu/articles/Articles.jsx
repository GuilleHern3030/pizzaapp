import { useEffect, useState } from "react";
import Category from "../categories/Categories";
import styles from "./Articles.module.css";

import { useSelector } from "react-redux";
import { getArticlesByCategory } from "../../../redux/reducers/articles/articlesSelector";

const categories = (articles) => {
    const categories = [];
    let index = 0;
    Object.values(articles).forEach(list => {
        categories.push(
            <Category key={index} index={index} title={list[0].category()} articles={list}/>
        )
        index ++;
    });
    return categories;
}

export default function ArticlesSection() {
    const articles = useSelector(getArticlesByCategory());
    const [articlesByCategory, setArticlesByCategory] = useState([])
    useEffect(() => { setArticlesByCategory(categories(articles)) }, []);
    return <section id="section-menu" className={styles.sectionMenu}> { articlesByCategory } </section>
}