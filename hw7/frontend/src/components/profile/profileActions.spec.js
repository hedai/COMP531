import {expect} from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import Action, { url } from '../../actions'

let profileActions
describe('Validate Profile actions (mocked requests)', () => {

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		profileActions = require('./profileActions')
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it("should fetch the user's proile information", () => {
      const username = 'sep1test'
      const headline = 'A new headline!'

      mock(`${url}/headline`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { username, headline }
      })

      profileActions.updateHeadline('does not matter')(
        fn => fn(action => {
        expect(action).to.eql({ 
          headline, type:'UPDATE_PROFILE'
        })
        done()
      }))
	})

	it('should update headline', () => {
	  const username = 'sep1test'
      const headline = 'A new headline!'

      mock(`${url}/headline`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { username, headline }
      })

      profileActions.updateHeadline('does not matter')(
        fn => fn(action => {
        expect(action).to.eql({ 
          headline, type:'UPDATE_PROFILE'
        })
        done()
      }))
	})
})