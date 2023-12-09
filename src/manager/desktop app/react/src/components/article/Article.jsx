import { useEffect, useRef, useState } from "react";
import styles from "./Article.module.css";

import defaultImg from '../../assets/images/nophoto.jpg'

import { createArticle } from "../../helpers/article";

import useImage from "../../hooks/useImage";

const CAN_USE_EXTERNAL_LINK = false;

export default function Article ({ article, id, onSubmit, onCancel, onDelete }) {
    if (article === undefined) return <></>;
    const [ changes, setChanges ] = useState(false)
    const [ imgSrc, setImgSrc ] = useState()
    
    const [ category, setCategory ] = useState(article != undefined ? article.category() : "")
    const [ name, setName ] = useState(article != undefined ? article.name() : "")
    const [ price, setPrice ] = useState(article != undefined ? article.price() : "")
    const [ coin, setCoin ] = useState(article != undefined ? article.coinSymbol() : "")
    const [ description, setDescription ] = useState(article != undefined ? article.description() : "")
    const [ register, setRegister ] = useState(article != undefined ? article.register() : "")
    const [ amount, setAmount ] = useState(article != undefined ? article._amount() : "")
    const [ imageuri, setImg ] = useState(article != undefined ? article.img() : "")
    const [ details, setDetails ] = useState(article != undefined ? article.details() : "")

    const [ useUrl, setUseUrl ] = useState(false)
    const useUrlRef = useRef()

    const { getSrc } = useImage()

    useEffect(() => {
        setCategory(article != undefined ? article.category() : "")
        setName(article != undefined ? article.name() : "")
        setPrice(article != undefined ? article.price() : "")
        setCoin(article != undefined ? article.coinSymbol() : "")
        setDescription(article != undefined ? article.description() : "")
        setRegister(article != undefined ? article.register() : "")
        setAmount(article != undefined ? article._amount() : "")
        setImg(article != undefined ? article.img() : "")
        setDetails(article != undefined ? article.details() : "")
    }, [article])

    useEffect(() => {
        if (imageuri != undefined) {
            if (typeof imageuri != 'string') setImgSrc(imageuri?.img)
            else {
                const fetchImage = async() => {
                    const img = await getSrc(imageuri)
                    console.log(img)
                    setImgSrc(img)
                }
                fetchImage();
            }
        }

    }, [imageuri])

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

    const handleOnChangeImage = e => {
        const img = e.target.files[0];
        const type = img.type.split("/");
        img["img"] = URL.createObjectURL(img);
        img["extension"] = type[type.length-1]
        img["filename"] = `${id}.${img.extension}`
        setImg(img)
        setChanges(true)
    }

    const handleSubmit = e => {
        if (changes) {
            if(category.length == 0
            || name.length == 0) {
                return onCancel()
            } else return onSubmit(parseObject(), article)
        } else return onCancel()
    }

    return <article className={styles.article}>
        <fieldset className={styles.fieldset}>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>Category</strong></p>
                <input value={value(category)} onChange={(e) => handleOnChange(e.target.value, setCategory, false)} placeholder="Category" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>Name</strong></p>
                <input value={value(name)} onChange={(e) => handleOnChange(e.target.value, setName, false)} placeholder="Name" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>Register</strong></p>
                <input value={value(register)} onChange={(e) => handleOnChange(e.target.value, setRegister, true)} placeholder="Register" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>Amount</strong></p>
                <input value={value(amount)} onChange={(e) => handleOnChange(e.target.value, setAmount, true, true)} placeholder="Amount" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>Price</strong></p>
                <input value={value(price)} onChange={(e) => handleOnChange(e.target.value, setPrice, true, true)} placeholder="Price" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>CoinSymbol</strong></p>
                <input value={value(coin)} onChange={(e) => handleOnChange(e.target.value, setCoin, true)} placeholder="$" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>Description</strong></p>
                <textarea value={value(description)} onChange={(e) => handleOnChange(e.target.value, setDescription, true)} placeholder="Description" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <p className={styles.label}><strong>Details</strong></p>
                <textarea value={value(details)} onChange={(e) => handleOnChange(e.target.value, setDetails, true)} placeholder="Details" className={styles.input}/>
            </div>
            <div className={styles.input_container}>
                <div className={styles.checkboxContainer}>
                    <p><strong>Image</strong></p>
                    { CAN_USE_EXTERNAL_LINK === true &&
                    <>
                        <p style={{fontSize:".85em"}}>{" (url:"}</p>
                        <input ref={useUrlRef} type="checkbox" id="useurl" name="useurl" value="useurl" onChange={e => setUseUrl(e.target.checked)}/>
                        <p style={{fontSize:".85em"}}> { ")" } </p>
                    </>
                    }
                </div>
                {
                    useUrl === false ? <input type="file" accept="image/*" className={styles.input} onChange={handleOnChangeImage}/> :
                    <input value={value(imageuri)} onChange={(e) => handleOnChange(e.target.value, setImg, true)} placeholder="Url" className={styles.input}/>
                }
                <img className={styles.img} src={imgSrc} onError={e => { e.preventDefault(); e.target.onerror = null; e.target.src = defaultImg; }}/>
            </div>
            <button className={styles.submit} onClick={handleSubmit}>Confirm</button>
            { article != undefined && <button className={styles.delete} onClick={onDelete}>Delete</button> }
        </fieldset>
        <button className={styles.cancel} onClick={onCancel}>Cancel</button>
    </article>
}