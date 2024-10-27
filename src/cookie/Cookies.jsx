import Cookies from 'js-cookie'

// token
export const setToken = (token) => {
    Cookies.set('token', token)
}
export const getToken = () => {
    return Cookies.get('token')
}
export const removeToken = () => {
    Cookies.remove('token')
}