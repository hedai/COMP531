import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Ricebook Login Page', () => {

    before('come to the landing page', (done) => {
        go().then(done)
    })

    it('Register a new user', (done) => {
        sleep(500)
        .then(findId('username').clear())
        .then(findId('username').sendKeys('dhdhdh'))
        .then(findId('email').clear())
        .then(findId('email').sendKeys('dh@rice.edu'))
        .then(findId('phone').clear())
        .then(findId('phone').sendKeys('111-222-3333'))       
        .then(findId('birth').sendKeys('07/01/1997'))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys('77005'))
        .then(findId('password').clear())
        .then(findId('password').sendKeys('whatever'))
        .then(findId('pwconf').clear())
        .then(findId('pwconf').sendKeys('whatever'))
        .then(findId('submitButton').click())
        .then(sleep(2000))
        .then(findId('successMessage').getText().then(text=>{
            expect(text).to.eql("Success! You can now log in as \"dhdhdh\".")
        }))
        .then(done)
    })

    it("Log in as my test user", (done)=>{
        sleep(500)
        .then(common.login)
        .then(done);
    })

    // after('should log out', (done) => {
    //     common.logout().then(done)
    // })
})
