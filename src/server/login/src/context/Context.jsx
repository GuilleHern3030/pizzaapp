import { createContext, useEffect, useState } from "react";
import { getArticles } from "../api/articles";
import Article from "../components/articles/article";

export const Context = createContext()

export function ContextProvider(props) {

    const [ articles, setArticles] = useState()
    const fetchArticles = async() => {
        try {
            const articles = await getArticles()
            setArticles(articles.map(article => new Article(article)))
        } catch(e) {
            setArticles(null)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    const getArticlesByCategory = () => {
        if (articles != undefined) {
            return articles;
        } else return null;
    }

    return (<>
        <Context.Provider value={
            {
                articles,
                getArticlesByCategory
            }
        }>
        { props.children }
        </Context.Provider>
    </>)
}