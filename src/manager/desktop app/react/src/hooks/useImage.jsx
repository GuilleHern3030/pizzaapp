import { useContext, useLayoutEffect } from "react";
import { CSV } from "../context/CSVContext"
import useGitHub from "./useGitHub";

export default function useImage(url) {

    const { data } = useContext(CSV) // json
    const git = useGitHub()

    // Guarda una imagen
    const commit = async(file) => {
        if (file != undefined) {
            const path = `${data?.imagesFolder}${file?.filename}`
            console.log("Commiting image:", path, file)
            // try { await git.deleteFile(path) } catch(e) { }
            await git.createFile(path, file)
            .catch(() => git.editFile(path, file))
            .catch(e => console.warn(e))
        }
    }

    // Elimina una imagen
    const remove = async(imageName) => 
        git.deleteFile(`${data?.imagesFolder}${imageName}`)

    // Cargar imagen
    const getSrc = async(article) => {
        if (article != undefined) try {
            const imageuri = (typeof article === 'string') ? article : article?.img()
            if (!imageuri.includes("http")) { // github image
                return git.rawImageUrl(`${data?.imagesFolder}${imageuri}`);
                const response = await git.getRawImage(`${data?.imagesFolder}${imageuri}`)
                return URL.createObjectURL(response)
            } else return imageuri; // external image
        } catch(e) { console.warn(e) }
    }

    return {
        commit,
        remove,
        getSrc
    }
}
