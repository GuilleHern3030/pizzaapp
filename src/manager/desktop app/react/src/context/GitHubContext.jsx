import { createContext, useState } from "react";

export const GitHub = createContext()

export function GitHubProvider(props) {

    const [ credentials, putCredentials ] = useState()

    const setCredentials = (user, repository, accesstoken) => {
        if (user != undefined && repository != undefined && accesstoken != undefined)
            putCredentials({ user, repository, accesstoken })
        else putCredentials(undefined)
    }

    return <GitHub.Provider
        value = {
            {
                setCredentials,
                credentials
            }
        }>
        { props.children }
    </GitHub.Provider>
}