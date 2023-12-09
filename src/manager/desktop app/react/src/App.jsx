import './App.css'

import Authenticate from './components/authenticate/Authenticate'
import Index from './components/index/Index'
import Loading from './components/loading/Loading'
import Error from './components/error/Error'

import useGitHub from './hooks/useGitHub'
import useCSV from './hooks/useCSV'

export default function App() {
  
  const { credentials } = useGitHub()
  const { json } = useCSV()

  try {
    return <>
    <header>
        <h1><strong>PizzaApp manager</strong></h1>
        <div className="header-bottom"></div>
    </header>
    {
      !credentials ? <Authenticate/> :
      !json() ? <Loading/> :
      <Index/> 
    }
    </>
  } catch(error) {
    return <Error error={error}/>
  }

}