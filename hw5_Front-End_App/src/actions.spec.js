import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Action, {url, updateError, updateSuccess, navToProfile, navToMain, navToIndex, resource} from './actions'


describe('Validate actions (these are functions that dispatch actions)', () => {

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

	it('should update error message (for displaying error mesage to user)', ()=>{
		const msg = 'test error message';
		const expectAction = {
			type: Action.ERROR,
			errorMsg: msg
		}
		expect(updateError(msg)).to.eql(expectAction);
	})

	it('should update success message (for displaying success message to user)', ()=>{
		const msg = 'test success message';
		const expectAction = {
			type: Action.SUCCESS,
			successMsg: msg
		}
		expect(updateSuccess(msg)).to.eql(expectAction);
	})

	it('should navigate (to profile, main, or landing)', ()=>{
		expect(navToIndex()).to.eql({type: Action.NAV_INDEX});
		expect(navToMain()).to.eql({type: Action.NAV_MAIN});
		expect(navToProfile()).to.eql({type: Action.NAV_PROFILE});
	})
})