const KEY = 'tmp-token'

export const getLocalToken = () => sessionStorage.getItem(KEY)
export const setLocalToken = (token) => sessionStorage.setItem(KEY, token != undefined ? token : "")