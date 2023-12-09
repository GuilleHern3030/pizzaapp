import './App.css'
import { useEffect, useState } from 'react';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './components/login/Login'

import Articles from './components/articles/Articles'
import Messages from './components/messages/Messages'

function App() {
  const [ authenticated, setAuthenticated ] = useState(false)
  const [ view, setView ] = useState()
  const articles = {}

  useEffect(() => {
    if (authenticated != false)
        setView(<Articles/>)
  }, [authenticated])

  return (<>
        <Header pageName={WEB_NAME} pageNameHref={FRONT_URL}>
            { authenticated != false && 
                [
                    <button key={0} onClick={() => setView(<Articles/>)}>Articles</button>,
                    <button key={1} onClick={() => setView(<Messages/>)}>Messages</button>        
                ] 
            }
        </Header>
        
        { 
            articles === null ? <p className={styles.nodata}> No data </p> : 
            articles === undefined ? <p className={styles.nodata}> Cargando ... </p> :
            authenticated == false ? <Login authenticated={authenticated} setAuthenticated={setAuthenticated}/> :
            view
        }

        <Footer copyrigth={COPYRIGHT}/>
  </>);
}

export default App
