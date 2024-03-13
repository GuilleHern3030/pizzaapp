import { useState } from "react"
import styles from "./Index.module.css"

// Views
import Table from "../table/Table"
import Lister from "../lister/Lister"
import Error from "../error/Error";
import Excel from "../excel/Excel";

const TABLE = 1;
const LIST = 2;
const EXCEL = 3;

const pages = [TABLE, LIST, EXCEL]

export default function Index() {
    const [ view, setView ] = useState(TABLE)

    const changeView = () => { 
        const newView = view + 1;
        setView(newView in pages ? newView : TABLE)
    }

    return view === TABLE ? <Table changeView={changeView}/> :
        view === LIST ? <Lister changeView={changeView}/> :
        view === EXCEL ? <Excel changeView={changeView}/> :
        <Error/>
}