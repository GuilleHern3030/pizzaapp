import { useEffect, useRef, useState } from "react"
import styles from "./Table.module.css"

// components
import Loading from "../loading/Loading"

// hooks
import useCSV from "../../hooks/useCSV"

// helpers
import { createArticle } from "../../helpers/article"

const COLUMNS = 9;

export default function Table({changeView}) {
    const csv = useCSV()
    const grid = useRef()

    const [ commited, setCommited ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ articles, setArticles ] = useState([])

    useEffect(() => {
        const csvRows = csv.json()
        setArticles(csvRows)
    }, [])

    const handleSave = async() => {
        setIsLoading(true)
        try {
            const articles = [];
            for (let cell of grid.current.children) try {
                if(cell.tagName === 'DIV') articles.push({id:Number(cell.innerText)})
                else {
                    const index = articles.length - 1;
                    articles[index][cell.name] = cell.value;
                }
            } catch(e) { }
            const csvCommited = await csv.commit(articles)
            setCommited(csvCommited) 
        } catch(e) { console.error(e) }
        setIsLoading(false)
    }

    const addRow = async() => {
        if (isLoading === false) {
            setIsLoading(true)
            const id = Math.max(...articles.map(article => Number(article.id()))) + 1;
            const article = createArticle(id)
            articles.push(article)
            setTimeout(() => { setIsLoading(false) }, 200);
        }
    }

    return <main>
        <section className={styles.section}>
            <div className={styles.showInListContainer}>
                <button className={styles.showInList} onClick={changeView}>Show in list</button>
            </div>
            <div ref={grid} className={styles.grid} style={{gridTemplateColumns:`max-content repeat(${COLUMNS}, 1fr)`}}>
                <Columns/>
                { articles.map((article, key) => <Row key={key} article={article}/>) }
            </div>
            <div>
                { isLoading === false ? 
                    <button className={styles.addButton} onClick={addRow}>Add</button> :
                    <p className={styles.column}>Loading...</p>
                }
            </div>
        </section>
        <div>
            { isLoading === false ?
                <button className={styles.save} onClick={handleSave}>Save</button> :
                <Loading/>
            }
        </div>
        { commited && <p className={styles.commited}>Commited</p> }
    </main>

}

const Columns = () => {
    const columns = Object.keys(createArticle().data)
    return columns.map((column, key) => <p key={key} className={styles.column}> { column } </p>)
}

const Row = ({article}) => {

    const [ category, setCategory ] = useState(article != undefined ? article.category() : "")
    const [ name, setName ] = useState(article != undefined ? article.name() : "")
    const [ price, setPrice ] = useState(article != undefined ? article.price() : "")
    const [ coin, setCoin ] = useState(article != undefined ? article.coinSymbol() : "")
    const [ description, setDescription ] = useState(article != undefined ? article.description() : "")
    const [ register, setRegister ] = useState(article != undefined ? article.register() : "")
    const [ amount, setAmount ] = useState(article != undefined ? article._amount() : "")
    const [ imageuri, setImg ] = useState(article != undefined ? article.img() : "")
    const [ details, setDetails ] = useState(article != undefined ? article.details() : "")
    
    const value = (getter) => getter == undefined ? "" : getter;
    const handleOnChange = (value, setter, nullable=false, onlyNumbers=false) => {
        const set = (value) => { setter(value) }
        if (value.length == 0 && nullable) set(null)
        else if (onlyNumbers) { if (!isNaN(value)) set(Number(value)) }
        else set(value)
    }

    return <>
        <div className={styles.id}> <p id="article-id">{article.id()}</p> </div>
        <input name="category" value={value(category)} onChange={(e) => handleOnChange(e.target.value, setCategory, false)} placeholder="Category" className={styles.input}/>
        <input name="name" value={value(name)} onChange={(e) => handleOnChange(e.target.value, setName, false)} placeholder="Name" className={styles.input}/>
        <input name="price" value={value(price)} onChange={(e) => handleOnChange(e.target.value, setPrice, true, true)} placeholder="Price" className={styles.input}/>
        <input name="coin" value={value(coin)} onChange={(e) => handleOnChange(e.target.value, setCoin, true)} placeholder="$" className={styles.input}/>
        <textarea name="description" value={value(description)} onChange={(e) => handleOnChange(e.target.value, setDescription, true)} placeholder="Description" className={styles.input}/>
        <input name="register" value={value(register)} onChange={(e) => handleOnChange(e.target.value, setRegister, true)} placeholder="Register" className={styles.input}/>
        <input name="amount" value={value(amount)} onChange={(e) => handleOnChange(e.target.value, setAmount, true, true)} placeholder="Amount" className={styles.input}/>
        <input name="imageuri" value={value(imageuri)} onChange={(e) => handleOnChange(e.target.value, setImg, true)} placeholder="Image" className={styles.input}/>
        <textarea name="details" value={value(details)} onChange={(e) => handleOnChange(e.target.value, setDetails, true)} placeholder="Details" className={styles.input}/>
    </>
}