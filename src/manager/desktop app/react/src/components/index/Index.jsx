import { useState } from "react"
import styles from "./Index.module.css"

// hooks
import Table from "../table/Table"
import Lister from "../lister/Lister"

export default function Index() {
    const [ inTable, setInTable ] = useState(false)
    const changeView = () => { setInTable(prev => !prev) }

    return inTable === true ? 
        <Table changeView={changeView}/> :
        <Lister changeView={changeView}/>
}