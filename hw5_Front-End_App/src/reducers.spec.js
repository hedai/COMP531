import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import {url} from './actions'
import {articles, profile, common} from './reducers'


describe('Validate reducers (these are functions that dispatch reducers)', () => {

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it('resource should be a resource (i.e., mock a request)', (done)=> {
		
		mock(`${url}/login`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})

		resource('GET', 'sample').then((response) => {
			expect(response.articles).to.exist;
		})
		.then(done)
		.catch(done)
	})

	it('resource should give me the http error', (done)=> {
		const username = 'hd15test'
		const password = 'wrong password'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).catch((err) => {
			expect(err.toString()).to.eql('Error: Unauthorized')
		})
		.then(done)
		.catch(done)
	})

	it('resource should be POSTable', (done)=> {
		const username = 'hd15test'
		const password = 'home-forgotten-they'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).then((response) => {
			expect(response).to.eql({username: "hd15test", result: "success"})
		})
		.then(done)
		.catch(done)
	})
})