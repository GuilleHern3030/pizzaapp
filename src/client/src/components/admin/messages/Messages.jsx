import { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../../../api/messages";
import styles from "./Messages.module.css";

export default function Messages() {

    const [ messages, setMessages ] = useState()

    useEffect(() => {
        const fetchData = async() => {
            try { 
                const messages = await getMessages();
                setMessages(messages.map((message, index) => <Message key={index} data={message}/>));
            } 
            catch (e) { 
                console.warn(e); 
                setMessages(null); 
            }
        }
        fetchData();
    }, []);
    
    return <div>
        { 
            messages === undefined ? <p className={styles.nodata}>Loading...</p> :
            messages === null ? <p className={styles.nodata} style={{color:"red"}}>Failed to load messages</p> :
            Array.isArray(messages) && messages.length == 0 ? <p className={styles.nodata}>No messages stored</p> :
            messages
        }
    </div>
}

const Message = ({data}) => {

    const { id, name, email, message } = data;
    const [ hiden, setHiden ] = useState(false)

    const onDeleteMessage = () => {
        setHiden(true)
        try { 
            deleteMessage(id) 
            console.log("Deleted", id)
        } catch(e) { console.error(e) }
    }

    return <fieldset className={hiden ? styles.deleted : styles.fieldset}>
        <div className={styles.center}><p><span>Message id {id}</span></p></div>
        { typeof name === 'string' && name.length > 0 && <p><span>Name:</span> {name}</p> }
        { typeof email === 'string' && email.length > 0 && <p><span>Email:</span> {email}</p> }
        <p><span>Message:</span> {message}</p>
        <div className={styles.center}><button className={styles.deletebutton} onClick={onDeleteMessage}>Delete</button></div>
    </fieldset>
}