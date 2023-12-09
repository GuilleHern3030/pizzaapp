import { GitHub } from "../context/GitHubContext"
import { useContext } from "react";

const errorStatus = (errorMessage="Internal error", error=undefined) => {
    return {
        ok: false,
        redirected: false,
        status: 500,
        statusText: "Server internal error",
        message: errorMessage,
        response: error
    }
}

const isAnImage = file => {
    if (file != undefined) try {
        new FileReader().readAsDataURL(file)
        return true;
    } catch(e) { }
    return false;
}

const decode64 = base64String => {
    const utf8String = atob(base64String);
    const uint8Array = new Uint8Array(utf8String.length);
    for (let i = 0; i < utf8String.length; i++)
        uint8Array[i] = utf8String.charCodeAt(i);
    const decoder = new TextDecoder('utf-8');
    const decodedContent = decoder.decode(uint8Array);
    return decodedContent.toString();
}

const encode64 = async content => {
    if (isAnImage(content)) return await encodeImage(content)
    else if (typeof content === 'object') return content.toString();
    else return encodeText(content)
}

const encodeText = text => {
    const encoder = new TextEncoder()
    const utf8Bytes = encoder.encode(text.toString())
    const base64Content = btoa(String.fromCharCode.apply(null, utf8Bytes))
    return {
        type: "text",
        content: base64Content,
        data: utf8Bytes,
        toString: () => text
    }
}

const encodeImage = imageFile => new Promise(async (resolve, reject) => {
    if (imageFile != undefined) try {
        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onloadend = () => {
            resolve({
                type: reader.result.split(';')[0].split('/')[1],
                content: reader.result.split(',')[1],
                data: reader,
                toString: () => reader.result.split(',')[1]
            })
        }
    } catch (error) { return reject(errorStatus("Internal error", error)) }
    else reject(errorStatus("Undefined image file"))
})

const parseGettedFile = response => {
    if (response?.ok) {
        try { response["text"] = decode64(response?.content) } catch (e) { }
        try { response["img_src"] = URL.createObjectURL(response?.blob) } catch(e) { }
        try { 
            response["img"] = function(className="", alt="", onError=()=>{}) { 
                return <img 
                    src={response?.download_url} 
                    className={className} 
                    alt={alt} 
                    onError={onError}
                /> 
            } 
        } catch(e) { }
    }
    return response;
}

export default function useGitHub() {
    const { credentials } = useContext(GitHub)

    // Private methods
    const getApiUrl = filePath => `https://api.github.com/repos/${credentials?.user}/${credentials?.repository}/contents/${filePath}`;
    const rawImageUrl = filePath => `https://raw.githubusercontent.com/${credentials?.user}/${credentials?.repository}/main/${filePath}`
    const hasCredentials = () => credentials != undefined;
    const query = (url, method, body) => fetch(url, {
        method,
        headers: { 'Authorization': `token ${credentials.accesstoken}` },
        body: JSON.stringify(body)
    }).then(async response => {
        let result = { response, ok:response?.ok, status: response?.status, statusText: response?.statusText, message: "" }
        try {
            const json = await response.clone().json()
            result = { ...result, ...json }
        } catch(e) { }
        try {
            const blob = await response.clone().blob()
            result['blob'] = blob;
        } catch(e) { }
        return result;
    }).catch(response => response)

    // Public methods

    const checkCredentials = (username, repository, token) => new Promise(async(resolve, reject) => {
        const response = (username != undefined && repository != undefined && token != undefined) ?
            await fetch(`https://api.github.com/users/${username}/repos`, { headers: { Authorization: `token ${token}` } }) : {}
        if (response?.ok) {
            const repos = await response.json();
            const hasRepo = repos.filter(repo => repo.name == repository).length > 0;
            if (hasRepo) resolve(true)
            else reject("Repository doesn't exists")
        } else reject("Invalid credentials")
    })

    const getFile = (filePath) => new Promise(async(resolve, reject) => {
        if (hasCredentials() && filePath != undefined) try {
            const response = await query(getApiUrl(filePath)).then(response => parseGettedFile(response))
            return response?.ok === true ? resolve(response) : reject(response)
        } catch (error) { console.error("Internal error"); return reject(error) }
        else reject(errorStatus("No credentials or invalid file"))
    })

    const createFile = (filePath, content) => new Promise(async(resolve, reject) => {
        if (hasCredentials() && content != undefined && filePath != undefined) try {
            const contentBase64 = await encode64(content)
            const response = await query(getApiUrl(filePath), 'PUT', {
                message: `create file ${filePath}`,
                content: contentBase64.content,
                encoding: 'base64'
            })
            return response?.ok === true ? resolve(response) : reject(response)
        } catch (badResponse) { console.error("Internal error"); return reject(badResponse) }
        else reject(errorStatus("No credentials or invalid file / content"))
    })

    const editFile = (filePath, content) => new Promise(async(resolve, reject) => {
        console.log(filePath, content)
        if (hasCredentials() && content != undefined && filePath != undefined) try {
            const sha = await getFile(filePath).then(res => res.sha)
            try {
                const contentBase64 = await encode64(content)
                const response = await query(getApiUrl(filePath), 'PUT', {
                    message: `edit file ${filePath}`,
                    content: contentBase64.content,
                    encoding: 'base64',
                    sha
                })
                return response?.ok === true ? resolve(response) : reject(response)
            } catch (badResponse) { console.error("Internal error"); return reject(badResponse) }
        } catch (responseWithoutSha) { return reject(responseWithoutSha) }
        else reject(errorStatus("No credentials or invalid file / content"))
    })

    const deleteFile = (filePath) => new Promise(async(resolve, reject) => {
        if (hasCredentials() && filePath != undefined) try {
            const sha = await getFile(filePath).then(res => res.sha)
            try {
                const response = await query(getApiUrl(filePath), 'DELETE', { message: `delete file ${filePath}`, sha })
                return response?.ok === true ? resolve(response) : reject(response)
            } catch (badResponse) { console.error("Internal error"); return reject(badResponse) }
        } catch (responseWithoutSha) { return reject(responseWithoutSha) }
        else reject(errorStatus("No credentials or invalid file"))
    })

    const getRawImage = async(filePath) => {
        const url = rawImageUrl(filePath)
        const response = await fetch(url).then(res => res.blob())
        return response;
    }


    return {
        credentials,
        checkCredentials,
        createFile,
        deleteFile,
        editFile,
        getFile,
        getRawImage,
        rawImageUrl
    }
}