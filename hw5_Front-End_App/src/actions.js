import fetch from 'isomorphic-fetch'

const isLocal = false
export const url = isLocal ? 'http://localhost:8080' : 'https://webdev-dummy.herokuapp.com'

const Action = {

     ADD_ARTICLE: 'ADD_ARTICLE'
    ,UPDATE_ARTICLES: 'UPDATE_ARTICLES'
    ,EDIT_ARTICLE: 'EDIT_ARTICLE'
    ,SEARCH_KEYWORD: 'SEARCH_KEYWORD'
    ,UPDATE_AVATARS: 'UPDATE_AVATARS'

    ,UPDATE_HEADLINE: 'UPDATE_HEADLINE'
    ,UPDATE_PROFILE: 'UPDATE_PROFILE'

    ,ERROR: 'ERROR'
    ,SUCCESS: 'SUCCESS'

    ,NAV_PROFILE: 'NAV_PROFILE'
    ,NAV_MAIN: 'NAV_MAIN'
    ,NAV_INDEX: 'NAV_INDEX'

    ,LOGIN_LOCAL: 'LOGIN_LOCAL'

}

export default Action

export function updateError(error) { return { type: Action.ERROR, errorMsg: error }}
export function updateSuccess(success) { return { type: Action.SUCCESS, successMsg: success }}
export function navToProfile() { return { type: Action.NAV_PROFILE }}
export function navToMain() { return { type: Action.NAV_MAIN }}
export function navToIndex() { return { type: Action.NAV_INDEX }}

export function resource(method, endpoint, payload, submitJson = true) {
    const options = {credentials: 'include', method}
    if (submitJson) options.headers = {'Content-Type': 'application/json'}
    if (payload) {
        options.body = submitJson ? JSON.stringify(payload) : payload
    }

    return fetch(`${url}/${endpoint}`, options)
    .then((response) => {
        if (response.status == 401) {
            const message = `Error in ${method} ${endpoint} ${JSON.stringify(response.json())}`
            throw new Error(message)
        } else {
            return response.json()
        }
    })
}