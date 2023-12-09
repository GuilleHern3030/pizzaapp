import { useState, useRef } from 'react'
import styles from './Login.module.css'
import getToken from '../../api/authenticate'
import tokenize from '../../scripts/tokenizer'

export default function Login(
    {
        authenticated, 
        setAuthenticated,
        userTitle = "User",
        userPassword = "Password"
    }) {

    const [ userRequired, setUserRequired ] = useState(false)
    const [ passwordRequired, setPasswordRequired ] = useState(false)
    const [ invalidLogin, setInvalidLogin ] = useState(false)
    const user = useRef()
    const password = useRef()

    const handleSubmit = async() => {
        const userName = user.current.value;
        const userPsw = password.current.value;
        if (userName.length > 0) {
            setUserRequired(false)
            if (userPsw.length > 0) {
                setPasswordRequired(false)
                const { token } = await getToken(userName, tokenize(userPsw, userName))
                if (token) setAuthenticated(token)
                else setInvalidLogin(true)
            } else setPasswordRequired(true)
        } else setUserRequired(true)
    }

    return <div className={styles.container}>
        <fieldset className={styles.form}>
            <label>Login</label>
            <input
                ref={user} 
                className={`${styles.input} ${userRequired ? styles.required : ""}`} 
                placeholder={userTitle} 
                required={true}
            />
            <input 
                ref={password} 
                className={`${styles.input} ${passwordRequired ? styles.required : ""}`} 
                placeholder={userPassword}
                type="password"
                required={true}
            />
            <button 
                className={styles.submit} 
                onClick={handleSubmit}
            >Log</button>
            <p className={styles.warning}>{
                userRequired ? "* User is required" :
                passwordRequired ? "* Password is required" : 
                invalidLogin ? "* Invalid credentials" : ""
            }</p>
        </fieldset>
    </div>
}