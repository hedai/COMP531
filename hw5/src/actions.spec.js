// import { expect } from 'chai'
// import mockery from 'mockery'
// import fetch, {mock} from 'mock-fetch'

// import Action, {url, updateError, updateSuccess, navToProfile, navToMain, navToIndex, resource} from './actions'


// describe('Validate actions (these are functions that dispatch actions)', () => {

// 	let Action, url, resource
// 	beforeEach(() => {
// 		if(mockery.enable) {
// 			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
// 			mockery.registerMock('node-fetch', fetch)
// 			require('node-fetch')
//   		}
//   		Action = require('./actions').default
//   		url = require('./actions').url
//   		resource = require('./actions').resource
// 	})

// 	afterEach(() => {
//   		if (mockery.enable) {
// 			mockery.deregisterMock('node-fetch')
// 			mockery.disable()
//   		}
// 	})

// 	it('resource should be a resource (i.e., mock a request)', (done)=> {	
// 		mock(`${url}/sample`, {
// 			method: 'GET',
// 			headers: {'Content-Type': 'application/json'},
// 			json:{articles:[{id:1, text:'hello world', author:'hd15test'}]}
// 		})

// 		resource('GET', 'sample').then((response) => {
// 			expect(response.articles).to.exist;
// 		})
// 		.then(done)
// 		.catch(done)
// 	})

// 	it('resource should give me the http error', (done)=> {

// 		resource('POST', 'wrong_endpoint').catch((err) => {
// 			expect(err).to.exist
// 		})
// 		.then(done)
// 		.catch(done)
// 	})

// 	it('resource should be POSTable', (done)=> {
// 		const username = 'hd15test'
// 		const password = 'home-forgotten-they'
		
// 		mock(`${url}/login`, {
// 			method: 'POST',
// 			headers: {'Content-Type': 'application/json'},
// 			json: {username, result:"success"}
// 		})

// 		resource('POST', 'login', {username, password }).then((response) => {
// 			expect(response).to.eql({username, result:"success"})
// 		})
// 		.then(done)
// 		.catch(done)
// 	})

// 	it('should update error message (for displaying error mesage to user)', ()=>{
// 		const msg = 'displaying error message';
// 		const expectAction = {
// 			type: Action.ERROR,
// 			error: msg
// 		}
// 		expect(updateError(msg)).to.eql(expectAction);
// 	})

// 	it('should update success message (for displaying success message to user)', ()=>{
// 		const msg = 'displaying success message';
// 		const expectAction = {
// 			type: Action.SUCCESS,
// 			success: msg
// 		}
// 		expect(updateSuccess(msg)).to.eql(expectAction);
// 	})

// 	it('should navigate (to profile, main, or landing)', ()=>{
// 		expect(navToIndex()).to.eql({type: Action.NAV_INDEX});
// 		expect(navToMain()).to.eql({type: Action.NAV_MAIN});
// 		expect(navToProfile()).to.eql({type: Action.NAV_PROFILE});
// 	})
// })