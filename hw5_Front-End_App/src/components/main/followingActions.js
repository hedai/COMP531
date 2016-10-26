import Promise from 'bluebird'
import Action, { resource, updateError } from '../../actions'

export function delFollower(name) { return fetchFollowers('DELETE', name) }
export function addFollower(name) { return fetchFollowers('PUT', name) }

export function fetchFollowers(method, name) {
    return (dispatch, getState) => {
    }
}