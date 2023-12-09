import { useRef, useState } from "react"
import styles from "./GithubEditor.module.css"
import useGitHub from "../../hooks/useGitHub"

export default function GitHubEditor() {
    const gh = useGitHub()

    const inputFileName = useRef()
    const inputImageSrc = useRef()
    const inputUseImage = useRef()
    const inputText = useRef()

    const [imgSrc, setImgSrc] = useState()
    const [img, setImg] = useState()
    const [txt, setTxt] = useState("")

    const [useImage, setUseImage] = useState(false)

    const fileName = () => inputFileName.current.value.length > 0 ? inputFileName.current.value : "image.png"
    const getContent = () => useImage ? imgSrc : inputText.current.value;

    const handleCreate = () => gh.createFile(fileName(), getContent())
        .then(response => { setTxt("Created"); console.log(response) })
        .catch(error => { setTxt("Not created (already exists?)"); console.error(error) })

    const handleEdit = () => gh.editFile(fileName(), getContent())
        .then(response => { setTxt("Edited"); console.log(response) })
        .catch(error => { setTxt("Not edited"); console.error(error) })

    const handleDelete = () => gh.deleteFile(fileName())
        .then(response => { setTxt("Deleted"); console.log(response) })
        .catch(error => { setTxt("Not deleted"); console.error(error) })

    const handleRead = async() => {
        try {
            const response = await gh.getFile(fileName())
            console.log(response)
            setImg(response.img())
            setTxt(response.text)
        } catch(error) { setTxt("Error in read"); console.error(error) }
    }

    return <div className={styles.container}>
        <fieldset className={styles.form}>
            <div className={styles.gridTitle}>
                <label className={styles.formTitle}> { useImage ? "Image" : "Text" } </label>
                <input ref={inputUseImage} type="checkbox" id="useimage" name="useimage" value="useimage" onChange={e => setUseImage(e.target.checked)}/>
            </div>
            <div className={styles.inputContainer}>
                <input ref={inputFileName} className={styles.input} placeholder="File name"/>
                {
                    useImage === true ? 
                    <input ref={inputImageSrc} className={styles.input} type="file" accept="image/*" onChange={e => setImgSrc(e.target.files[0])} /> :
                    <textarea ref={inputText} className={styles.input} placeholder="Text content"/>
                }
            </div>
            <button className={styles.submit} onClick={handleRead}>Read</button>
            <button className={styles.submit} onClick={handleCreate}>Create</button>        
            <button className={styles.submit} onClick={handleEdit}>Edit</button>        
            <button className={styles.submit} onClick={handleDelete}>Delete</button>        
            <p className={styles.text}> { txt } </p>
            { img }
        </fieldset>       
    </div>

}