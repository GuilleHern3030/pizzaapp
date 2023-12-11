import { useContext, useLayoutEffect } from "react";
import { CSV } from "../context/CSVContext"
import useGitHub from "./useGitHub";
import Article from "../helpers/article";

export default function useCSV(url) {

    const { content, data, jsonToCsv, setContent } = useContext(CSV) // json
    const git = useGitHub()

    useLayoutEffect(() => {
        if (url != undefined) {
            getFile(url)
                .then(data => csvToJson(data?.text))
                .then(json => { setContent(json) })
        }
    }, [])

    const json = () => {
        if (data === null) throw "No data";
        return content ? [].concat(content) : undefined;
    }

    // Obtiene el index del array content según un id de artículo
    const getIndexById = id => {
        let i = 0;
        let index = undefined;
        while (content != undefined && i < content.length && index == undefined) {
            if (content[i].id() == id) index = i;
            i++;
        }
        return index;
    }

    // Añade un artículo al content
    const add = article => {
        if (article instanceof Article) {
            content.push(article)
            return true;
        } else return false;
    }

    // Edita un artículo del content según su id
    const edit = (id, newArticle) => {
        const index = getIndexById(id)
        if (index != undefined) {
            content[index] = newArticle;
            return true;
        } else return false;
    }

    // Elimina un artículo del content según su id
    const remove = id => {
        const index = getIndexById(id)
        if (index != undefined) {
            content.splice(index, 1)
            return true;
        } else return false;
    }

    // Selecciona un artículo del content según su index en el array
    const get = index => {
        if (index != undefined && content != undefined)
            return content[index]
    }

    // Selecciona un artículo del content según su id
    const selectById = id => {
        if (id != undefined && content != undefined)
            return content.filter(article => article.id() == id)[0]
    }

    const list = () => content ? content.map(article => article.name()) : []

    // Guarda los cambios
    const commit = async(json) => {
        if (content != undefined) try {
            if (json == undefined) json = content;
            const csv = await jsonToCsv(json)
            await git.editFile(data?.path, csv)
            .catch(async() => await git.createFile(data?.path, csv))
            console.log(csv)
            console.log("commited into " + data?.path)
            return true;
        } catch(e) { console.error(e) }
        return false;
    }

    // Cantidad de elementos dentro de content
    const length = () => content ? content.length : 0

    // Id máximo dentro de content
    const maxId = () => {
        let maxId = 0;
        if (content != undefined) content.forEach(article => {
            if (article.id() > maxId) maxId = article.id()
        });
        return maxId;
    }

    return {
        csv: function() { return jsonToCsv(content) },
        json, // a copy not modify the original content json
        add,
        get,
        edit,
        remove,
        selectById,
        list,
        commit,
        length,
        maxId
    }
}
