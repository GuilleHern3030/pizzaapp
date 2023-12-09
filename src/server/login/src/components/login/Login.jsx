import { useState, useRef } from 'react'
import styles from './Login.module.css'
import getToken from '../../api/authenticate'
import tokenize from './tokenizer'

const outlineStyle = `outline: 4px auto red`
const userRequired = "";
const passwordRequired = "";

export default function Login(
    {
        authenticated, 
        setAuthenticated,
        userTitle = "User",
        userPassword = "Password",
        warningUserRequired = "* User is required",
        warningPasswordRequired = "* Password is required",
        warningInvalidLogin = "* Invalid credentials"
    }) {

    const user = useRef()
    const password = useRef()

    const [ invalidLogin, setInvalidLogin ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handleKeyPressInUserInput = (event) => {
        if (event.key === 'Enter') {
            if (user.current.value.length > 0) password.current.focus()
            else handleSubmit()
        }
    };

    const cleanWarning = () => {
        user.current.setAttribute("style", "")
        password.current.setAttribute("style", "")
        setInvalidLogin(false)
    }

    const handleSubmit = async() => {
        cleanWarning()
        const userName = user.current.value;
        const userPsw = password.current.value;
        if (userName.length > 0) {
            if (userPsw.length > 0) {
                setLoading(true)
                const { token } = await getToken(userName, tokenize(userPsw, userName))
                setLoading(false)
                if (token) setAuthenticated(token)
                else setInvalidLogin(warningInvalidLogin)
            } else { 
                setInvalidLogin(warningPasswordRequired) 
                password.current.setAttribute("style", outlineStyle)
                password.current.focus()
            }
        } else {
            setInvalidLogin(warningUserRequired)
            user.current.setAttribute("style", outlineStyle)
            user.current.focus()
        }
    }

    return <form className={styles.container}>
        <fieldset className={styles.form}>
            <label>Login</label>

            <input
                ref={user} 
                className={`${styles.input} ${userRequired ? styles.required : ""}`} 
                placeholder={userTitle} 
                onKeyDown={handleKeyPressInUserInput}
                style={{}}
                required={true}
            />

            <input 
                ref={password} 
                className={`${styles.input} ${passwordRequired ? styles.required : ""}`} 
                placeholder={userPassword}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                type="password"
                required={true}
            />

            {
                loading ? <div className={styles.spinner}></div>:
                <button className={styles.submit} onClick={handleSubmit}>Log</button>
            }

            <p className={styles.warning}> { invalidLogin ? invalidLogin : "" } </p>
        
        </fieldset>
    </form>
}