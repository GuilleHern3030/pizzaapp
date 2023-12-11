import { useEffect, useState } from "react"
import styles from "./Lister.module.css"

// components
import Loading from "../loading/Loading"
import Spinner from "../spinner/Spinner"
import Article from "../article/Article"

// hooks
import useCSV from "../../hooks/useCSV"
import useImage from "../../hooks/useImage"

const CAN_USE_TABLE = true;

export default function Lister({changeView}) { 
    const csv = useCSV()
    const img = useImage()

    const [ isLoading, setIsLoading ] = useState(false)

    const [ option, setOption ] = useState()
    const [ articleSelected, setArticleSelected ] = useState()
    const [ anyArticleEdited, setAnyArticleEdited ] = useState(false)
    const [ commited, setCommited ] = useState()

    useEffect(() => { setArticleSelected(csv.get(option)) }, [option])

    const createArticle = (newArticle) => {
        setAnyArticleEdited(true)
        csv.add(newArticle)
        clearSelection()
    }

    const editArticle = (newArticle, oldArticle) => {
        setAnyArticleEdited(true)
        csv.edit(oldArticle.id(), newArticle)
        clearSelection()
    }

    const deleteArticle = () => {
        setAnyArticleEdited(true)
        csv.remove(articleSelected.id())
        img.remove(articleSelected.img())
        clearSelection()
    }

    const commitArticles = async() => {
        clearSelection()
        setAnyArticleEdited(false)
        setIsLoading(true)
        const csvData = csv.json().map(article => article.data)
        csvData.map(articleData => {
            if (typeof articleData.imageuri != 'string') {
                img.commit(articleData?.imageuri)
                articleData.imageuri = articleData?.imageuri?.filename;
            }
            return articleData;
        })
        const csvCommited = await csv.commit(csvData)
        setCommited(csvCommited)
        setIsLoading(false)
    }

    const clearSelection = () => { 
        setOption(undefined)
        setArticleSelected(undefined)
        setCommited(undefined)
    }

    return isLoading === true ? <Loading/> : <main className={styles.main}>
        <div className={styles.spinner}>
            { CAN_USE_TABLE === true &&
                <div className={styles.showAllInTableContainer}>
                    <button className={styles.showAllInTable} onClick={changeView}>Show all in table</button>
                </div>
            }
            <p className={styles.spinnerTitle}>Select an article</p>
            <Spinner optionList={csv.list()} selectedOption={option} onSelectOption={setOption}/>
        </div>
        { articleSelected === undefined ? (<>
                <button className={styles.createButton} onClick={() => setArticleSelected(null)}>Create</button> 
                { anyArticleEdited === true && <button className={styles.commitButton} onClick={commitArticles}>Save changes</button> }
            </>) :
            <Article 
                article={articleSelected}
                id={articleSelected != undefined ? articleSelected.id() : (csv.maxId()+1) }
                onSubmit={articleSelected != undefined ? editArticle : createArticle}
                onDelete={articleSelected != undefined ? deleteArticle : clearSelection}
                onCancel={clearSelection}
            />
        }
        { commited === true ? <p>Commited</p> : commited === false && <p>Fail on commit</p> }
    </main>
}