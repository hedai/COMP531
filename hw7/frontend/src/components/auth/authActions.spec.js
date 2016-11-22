import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import { localLogin, logout } from './authActions'
import Action from '../../actions'

let url
describe('Validate Authentication (involves mocked requests)', () => {

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
   		url = require('../../actions').url
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it('should log in a user', (done) => {
		const username = 'hd15test'
		const password = 'home-forgotten-they'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, result:'success'}
		})

		let count = 0
		localLogin(username, password)(action => {
			try {
				if (action.type === Action.LOGIN_LOCAL) {
					expect(action.username).to.eql(username)
				}
				count++
			} catch (e) {
				done(e)
			}
		}).then(() => {
			expect(count).to.eql(2)
		}).then(done)
		.catch(done)
	})

	it('should not log in an invalid user', (done) => {
		const username = 'hd15test'
		const password = 'wrongword'
		localLogin(username,password)((action) => {
			try{
				expect(action.type).to.eql(Action.ERROR)
				expect(action.error).to.eql('There was an error logging in as '+username)
				done()
			} catch(e){
				done(e)
			}
		})
	})

	it('should log out a user (state should be cleared)', (done) => {
		logout()((action)=>{
            expect(action).to.eql({
                type:'LOG_OUT'
            })
            done()
        })
	})

})