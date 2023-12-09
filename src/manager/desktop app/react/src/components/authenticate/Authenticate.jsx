import styles from './Authenticate.module.css'
import { useState, useRef, useEffect, useContext } from 'react'
import { tokenize, detokenize } from '../../helpers/tokenizer';
import { GitHub } from '../../context/GitHubContext'
import useGitHub from '../../hooks/useGitHub';
import Loading from '../loading/Loading';

const CAN_USE_GITHUB = true;

const validateInput = (input, warningSetter, warningMessage) => {
    const value = input.current.value;
    if (value.length > 0) return input.current.value;
    else warningSetter(warningMessage)
    input.current.focus()
    throw warningMessage;
}

const setFocus = (self, next) => {
    if (self.current.value.length > 0) 
        next.current.focus()
}

export default function Authenticante() {
    const [ token, setToken ] = useState("")
    const [ pageName, setPageName ] = useState()
    return token === undefined ? 
        <Register setToken={setToken} setPageName={setPageName}/> :
        <Login 
            token={token} 
            setToken={setToken} 
            pageName={pageName}
            setPageName={setPageName}
            signupAvailable={CAN_USE_GITHUB}
        />
}

const Register = ({setToken, setPageName}) => {

    const [ warningMessage, setWarningMessage ] = useState("")

    const inputUser = useRef()
    const inputRepo = useRef()
    const inputAccessToken = useRef()
    const inputPageName = useRef()

    const handleSubmit = async() => {
        setWarningMessage("")
        try {
            const user = validateInput(inputUser, setWarningMessage, "* User is required")
            const repository = validateInput(inputRepo, setWarningMessage, "* Repository name is required")
            const accesstoken = validateInput(inputAccessToken, setWarningMessage, "* Access token is required")
            const pageName = validateInput(inputPageName, setWarningMessage, "* Page name is required")
            setToken(tokenize(user, repository, accesstoken, pageName))
            setPageName(pageName)
        } catch(e) { }
    }

    return <div className={styles.container}>
        <fieldset className={styles.form}>
            <label><strong>Sign up</strong></label>
            <div className={styles.inputContainer}>
                <input
                    key={1}
                    ref={inputUser} 
                    className={styles.input} 
                    placeholder="User name" 
                    onKeyDown={e => e.key === 'Enter' && setFocus(inputUser, inputRepo)}
                    required={true}
                />
                <input 
                    key={2}
                    ref={inputRepo} 
                    className={styles.input} 
                    placeholder="Repository name"
                    onKeyDown={e => e.key === 'Enter' && setFocus(inputRepo, inputAccessToken)}
                    required={true}
                />
                <input 
                    key={3}
                    ref={inputAccessToken} 
                    className={styles.input} 
                    placeholder="Access token"
                    type="password"
                    onKeyDown={e => e.key === 'Enter' && setFocus(inputAccessToken, inputPageName)}
                    required={true}
                />
                <hr className={styles.hr}/>
                <input 
                    key={4}
                    ref={inputPageName} 
                    className={styles.input} 
                    placeholder="Page name"
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    required={true}
                />
            </div>
            <button className={styles.submit} onClick={handleSubmit}>Reg</button>
            <p className={styles.warning}> { warningMessage } </p>
            <button 
                onClick={() => { setWarningMessage(""); setToken("") }}
                className={styles.tokenButtonChanger}> 
                { "Use token" }
            </button>
        </fieldset>
    </div>
}

const Login = ({token, setToken, pageName, setPageName, signupAvailable=false}) => {

    const { setCredentials } = useContext(GitHub)
    const { checkCredentials } = useGitHub()

    const [ warningMessage, setWarningMessage ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)

    const inputPageName = useRef()
    const inputToken = useRef()

    const ghSetCredentials = async ({user, repository, accesstoken}) => {
        await checkCredentials(user, repository, accesstoken)
        .then(() => { setCredentials(user, repository, accesstoken) })
        .catch(error => { setWarningMessage(`* ${error}`) })
    }

    const handleSubmit = async() => {
        const process = async () => {
            try {
                const page = validateInput(inputPageName, setWarningMessage, "* Page name is required")
                const token = validateInput(inputToken, setWarningMessage, "* Token is required")
                await ghSetCredentials(detokenize(token, page))
            } catch(e) { }
        }
        setIsLoading(true)
        setWarningMessage("")
        await process()
        setIsLoading(false)
    }

    useEffect(() => { inputPageName.current.value = pageName ? pageName : "" }, [pageName])
    useEffect(() => { inputToken.current.value = token }, [token])

    return <div className={styles.container}>
        <fieldset className={styles.form}>
            <label><strong>Sign in</strong></label>
            <div className={styles.inputContainer}>
                <input
                    key={10}
                    ref={inputPageName} 
                    className={styles.input} 
                    placeholder="Page name" 
                    onChange={ e => setPageName(e.target.value) }
                    onKeyDown={e => e.key === 'Enter' && setFocus(inputPageName, inputToken)}
                    required={true}/>
                <input
                    key={11}
                    ref={inputToken} 
                    className={`${styles.input} ${token.length > 0 ? styles.token : ""}`}
                    onChange={ e => setToken(e.target.value) }
                    placeholder="Token" 
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    required={true}/>
            </div>
            {
                isLoading === false ?
                <button className={styles.submit} onClick={handleSubmit}>Log</button> :
                <Loading className={styles.loading}/>
            }
            <p className={styles.warning}> { warningMessage } </p>
            { signupAvailable === true && <button 
                    onClick={() => { setWarningMessage(""); setToken(undefined) }}
                    className={styles.tokenButtonChanger}> 
                    { "Use GitHub credentials" }
                </button>
            }
        </fieldset>
    </div>
}