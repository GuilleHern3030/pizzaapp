import { createContext, useContext, useState, useEffect } from "react";
import { GitHub } from "./GitHubContext";
import useGitHub from "../hooks/useGitHub";
import Article from "../helpers/article";

const JSON_DATA = "./assets/data.json";

const NEW_LINE = "\r\n";
const SEPARATOR = ",";
const ID = "id";

export const CSV = createContext()

export function CSVProvider(props) {
    const { credentials } = useContext(GitHub)
    const { getFile } = useGitHub()

    const [ content, setContent ] = useState()
    const [ data, setData ] = useState()

    useEffect(() => {
        fetch(JSON_DATA)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => setData(null))
    }, [])

    useEffect(() => {
        if (credentials != undefined && content == undefined && data != undefined) 
            getFile(data.path)
                .then(data => csvToJson(data?.text))
                .then(json => json.map(element => new Article(element)))
                .then(articles => { setContent(articles) })
                .catch(err => { setContent([]) })
        else setContent(undefined)
    }, [credentials, data])

    return <CSV.Provider value = { { content, data, csvToJson, jsonToCsv, setContent } }>
        { props.children }
    </CSV.Provider>
}

const csvToJson = rawCSV => {
        
    let content = rawCSV.split(NEW_LINE);

    const headers = ((content).shift()).split(`"${SEPARATOR}"`).map(item => item.replace(/"/g, ''));
    const rows = [];

    while(content.length > 0) {
        const line = content.shift();
        if (typeof line === 'string' && line.length > 0) {
            const arrayLine = [];
            let l = 0;
            while(l < line.length) {
                if (line.substring(l, l+1).includes('"')) {
                    const end = line.substring(l+1).indexOf('"') + l + 1;
                    arrayLine.push(line.substring(l+1, end));
                    l = end + 2;
                } else { // null
                    arrayLine.push(null);
                    l += 5;
                }
            }
            rows.push(arrayLine);
        }
    }
    
    let elements = {}
    for (let i = 0; i < rows.length; i++) {
        elements[i] = {};
        elements[i][ID] = (i + 1);
        for (let h = 0; h < headers.length; h++) 
            elements[i][headers[h]] = rows[i][h];
    }
    elements = Object.keys(elements).map(key => elements[key]) // parse json to array
    return elements;
}

const jsonToCsv = array => {
    try {
        const columns = Object.keys(array[0])
        if (columns.length > 0) {
            let csv = '"' + columns.join('","') + '"' + NEW_LINE;
            array.forEach(row => {
                columns.forEach(column => { csv += '"' + row[column] + '"'; })
                csv += NEW_LINE;
            });
            return csv
                .replace(new RegExp('""', 'g'), '","')
                .replace(new RegExp('"null"', 'g'), 'NULL')
                .replace(new RegExp('"undefined"', 'g'), 'NULL')
        }
    } catch(e) { }
    return "";
}