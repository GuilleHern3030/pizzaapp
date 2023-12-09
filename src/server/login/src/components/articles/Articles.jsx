import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import { createArticle } from "./article";
import { actualizeArticles } from "../../api/articles";

import Spinner from "../spinner/Spinner";
import styles from "./Articles.module.css";

const sort = (categories) => {
    let articles = [];
    Object.values(categories).forEach(category => articles = articles.concat(category))
    return articles
}

const maxId = articles => {
    try {
        let maxId = 0;
        articles.forEach(article => {
            if (article.id() > maxId) maxId = article.id();
        })
        return maxId + 1;
    } catch(e) { return 1; }
}

export default function Articles() {

    const { getArticlesByCategory } = useContext(Context)

    const categories = getArticlesByCategory()
    const [ articles, setArticles ] = useState([])
    const [ saveButton, setSaveButton ] = useState(false)
    const [ article, setArticle ] = useState()
    const [ selectedOption, setSelectedOption ] = useState(undefined)
    const [ saveDataText, setSaveDataText ] = useState()
    const [ saveDataEnabled, setSaveDataEnabled ] = useState(true)
    const createArticle = () => setSelectedOption(null)
    const saveArticles = async() => {
        if (saveDataEnabled) {
            setSaveDataEnabled(false)
            setSaveDataText("Saving...")
            const success = await actualizeArticles(articles.map(article => article.data()))
            if (success !== false) {
                setSaveDataText("Saved successfully")
            }
            else setSaveDataText("Saved failed")
            //setSaveDataEnabled(true)
        }
    }

    const onSelectOption = (index) => {
        setSelectedOption(index)
        setArticle(articles[index])
    }
    const onCancelSubmit = () => setSelectedOption(undefined)
    const onDeleteArticle = () => {
        articles.splice(selectedOption, 1);
        //setArticles(articles => { articles.splice(selectedOption, 1); return articles; })
        setSelectedOption(undefined)
        setSaveButton(true)
    }
    const onSubmitArticle = (article, prevArticle) => {
        //setArticles(articles => {
            if (prevArticle == undefined) articles.push(article)
            else articles[selectedOption] = article;
        //    return articles;
        //})
        setSelectedOption(undefined)
        setSaveButton(true)
    }

    useLayoutEffect(() => setArticles(sort(categories)), [])
    useEffect(() => {
        setSaveDataText("Save in DataBase")
        setSaveDataEnabled(true)
    }, [saveButton])
    return <div className={styles.main}>
        { selectedOption === undefined && <Spinner 
            optionList={articles.map((article, index) => <option key={index} value={index}>{article.name()}</option>)} 
            selectedOption={selectedOption} 
            onSelectOption={onSelectOption}/>
        }
        <ArticleEditor 
            article={selectedOption != undefined ? article : selectedOption} 
            onSubmit={onSubmitArticle} 
            onCancel={onCancelSubmit}
            onDelete={onDeleteArticle}
            id={selectedOption != undefined ? article.id() : maxId(articles)}
        />
        { selectedOption === undefined && <button className={styles.submit} onClick={createArticle}>Create article</button> }
        { saveButton && selectedOption === undefined && <button className={styles.save} onClick={saveArticles}>{saveDataText}</button> }
    </div>
}

const ArticleEditor = ({ article, id, onSubmit, onCancel, onDelete }) => {
    if (article === undefined) return <></>;
    const [ changes, setChanges ] = useState(false)
    
    const [ category, setCategory ] = useState(article != undefined ? article.category() : "")
    const [ name, setName ] = useState(article != undefined ? article.name() : "")
    const [ price, setPrice ] = useState(article != undefined ? article.price() : "")
    const [ coin, setCoin ] = useState(article != undefined ? article.coinSymbol() : "")
    const [ description, setDescription ] = useState(article != undefined ? article.description() : "")
    const [ register, setRegister ] = useState(article != undefined ? article.register() : "")
    const [ amount, setAmount ] = useState(article != undefined ? article._amount() : "")
    const [ imageuri, setImg ] = useState(article != undefined ? article.img() : "")
    const [ details, setDetails ] = useState(article != undefined ? article.details() : "")

    const parseObject = () => createArticle(id, category, name, price, coin, description, register, amount, imageuri, details)
    const value = (getter) => getter == undefined ? "" : getter;
    const handleOnChange = (value, setter, nullable=false, onlyNumbers=false) => {
        const set = (value) => {
            setter(value)
            setChanges(true)
        }
        if (value.length == 0 && nullable) set(null)
        else if (onlyNumbers) { if (!isNaN(value)) set(Number(value)) }
        else set(value)
    }

    const handleSubmit = e => {
        if (changes) {
            if(category.length == 0
            || name.length == 0) {
                return onCancel()
            } else return onSubmit(parseObject(), article)
        } else return onCancel()
    }

    return <>
        <fieldset className={styles.article}>
            <p>Article {id}</p>
            <div className={styles.input_container}>
                <p className={styles.label}>Category</p>
                <input value={value(category)} onChange={(e) => handleOnChange(e.target.value, setCategory, false)} placeholder="Category" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>Name</p>
                <input value={value(name)} onChange={(e) => handleOnChange(e.target.value, setName, false)} placeholder="Name" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>Price</p>
                <input value={value(price)} onChange={(e) => handleOnChange(e.target.value, setPrice, true, true)} placeholder="Price" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>CoinSymbol</p>
                <input value={value(coin)} onChange={(e) => handleOnChange(e.target.value, setCoin, true)} placeholder="CoinSymbol" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>Description</p>
                <input value={value(description)} onChange={(e) => handleOnChange(e.target.value, setDescription, true)} placeholder="Description" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>Register</p>
                <input value={value(register)} onChange={(e) => handleOnChange(e.target.value, setRegister, true)} placeholder="Register" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>Amount</p>
                <input value={value(amount)} onChange={(e) => handleOnChange(e.target.value, setAmount, true, true)} placeholder="Amount" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>Img</p>
                <input value={value(imageuri)} onChange={(e) => handleOnChange(e.target.value, setImg, true)} placeholder="Image" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}>Details</p>
                <input value={value(details)} onChange={(e) => handleOnChange(e.target.value, setDetails, true)} placeholder="Details" className={styles.input}/>
            </div>
            <button className={styles.submit} onClick={handleSubmit}>Confirm</button>
            <button className={styles.delete} onClick={onDelete}>Delete</button>
        </fieldset>
        <button className={styles.cancel} onClick={onCancel}>Cancel</button>
    </>
}