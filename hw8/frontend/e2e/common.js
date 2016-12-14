import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: "hd15test",
    password: "home-forgotten-they"
}

exports.login = () => 
    sleep(500)
    .then(findId('loginUsername').clear())
    .then(findId('loginPassword').clear())
    .then(findId('loginUsername').sendKeys(exports.creds.username))
    .then(findId('loginPassword').sendKeys(exports.creds.password))
    .then(findId('loginBtn').click())
    .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('logout').click())
    .then(sleep(500))


