import axios from "./axios.js";
import { getLocalToken } from "./localtoken.js";

const endpoint = "/articles";

/**
 * Establece la conexión con una api que conecte a una Base de Datos
 * @returns {Promise} Devuelve una promesa con información de la tabla
 */
export const getArticles = async() => {
    try {
        const { data } = await axios.get(endpoint)
        return data;
    } catch(e) {
        return null;
    }
}

export const deleteArticle = async(id, token=undefined) => {
    if (token == undefined) token = getLocalToken()
    const { data } = await axios.delete(endpoint + "/" + id, { headers: { "token": token } })
    return data;
}

export const putArticle = async(id, json, token=undefined) => {
    if (token == undefined) token = getLocalToken()
    const { data } = await axios.put(endpoint + "/" + id, json, { headers: { "token": token } })
    return data;
}

export const postArticle = async(json, token=undefined) => {
    if (token == undefined) token = getLocalToken()
    const { data } = await axios.post(endpoint, json,{ headers: { "token": token } })
    return data;
}

export const actualizeArticles = async(newArticles, token=undefined) => {
    const articlesAreEquals = (article1, article2) => {
        const sort = (obj) => {
            if (typeof obj !== 'object' || obj === null) return obj;
            if (Array.isArray(obj)) return obj.map(sort).sort();
            return Object.keys(obj).sort().reduce((sorted, key) => { sorted[key] = sort(obj[key]); return sorted; }, {});
        }      
        const sortedObject1 = JSON.stringify(sort(article1));
        const sortedObject2 = JSON.stringify(sort(article2));
        return sortedObject1 === sortedObject2;
    }

    const articleWithId = (id, articles) => {
        const articlesWithSameId = articles.filter(article => id === article.id);
        if (articlesWithSameId.length > 1) throw new Exception("Repeated id")
        else if (articlesWithSameId.length > 0) return articlesWithSameId[0];
        else return null;
    }

    const createdArticles = (oldArticles, newArticles) => newArticles.filter(article => articleWithId(article.id, oldArticles) == null)
    const deletedArticles = (oldArticles, newArticles) => oldArticles.filter(article => articleWithId(article.id, newArticles) == null)
    const editedArticles = (oldArticles, newArticles) => oldArticles.filter(article => {
        const editedArticle = articleWithId(article.id, newArticles)
        return (editedArticle != null) ? !articlesAreEquals(article, editedArticle) : false
    })

    try {
        const data = await getArticles(true)
        const created = createdArticles(data, newArticles)
        const deleted = deletedArticles(data, newArticles)
        const edited = editedArticles(data, newArticles)

        deleted.forEach(article => deleteArticle(article.id, token));
        created.forEach(article => postArticle(article, token));
        edited.forEach(article => putArticle(article.id, article, token));

        const changes = { created, deleted, edited }
        console.log(changes)
        return changes;
    } catch(e) {
        console.warn(e)
        return false;
    }
}