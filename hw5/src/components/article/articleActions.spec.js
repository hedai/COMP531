import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import Action, { url } from '../../actions'
//import {articleActions} from './articleActions'

let articleActions
describe('Validate Article actions', () => {

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  			articleActions = require('./articleActions')
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it('should update the search keyword', (done) => {
		const keyword = 'keyword'
		const expectAction = {
			type: Action.SEARCH_KEYWORD,
			keyword
		}
        expect(articleActions.searchKeyword(keyword)).to.eql(expectAction)
	})
	
	// it('should fetch articles (mocked request)', (done) => {
 //        const State = {articles : {avatars:{}}}

 //        mock(`${url}/articles`,{
 //            method:'GET',
 //            headers: {'Content-Type':'application/json'},
 //            json: { articles: [{id: 1, author: 'hd15', comments: [] }]}
 //        })

 //        articleActions.fetchArticles()(
 //            action =>{
 //                expect(action).to.satisfy((action)=>{
 //                    return action.type=='UPDATE_ARTICLES'
 //                })
 //                done()
 //            }
 //        )
 //    })


})