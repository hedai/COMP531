import React from 'react'
import {expect} from 'chai'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {shallow} from 'enzyme'

import Reducer from '../../reducers'
import Action from '../../actions'
import {ArticlesView} from './articlesView'
import {NewArticle} from './newArticle' 

const state = {
    common:{error:'', success: '',location: ''},
    articles:{articles:{},searchKeyword:'', avatars: {} },
    profile: { username: '',headline: '',avatar: '',email: '',zipcode: '',dob: ''},
}

let articles = {1:{id:1,author:'hd15', text:'Text A'}}  
let addAricle = {id:2,author:'hd15', text:'Text B'}
let newArticles = {...articles, 2: addAricle}

describe('ArticlesView (component tests)', ()=> {
	it('should render articles', ()=>{
		const articles = [{_id:1, text:'Text A', author:'hd15', date:'',comments:[],img:''},
						  	{_id:2, text:'Text B', author:'hd15', date:'',comments:[],img:''}]
		const node = shallow(<ArticlesView articles = {articles} dispatch={_ => _}/>)
		expect(node.children().length).to.eql(5)
	})

	it('should dispatch actions to create a new article',()=> {
        expect(Reducer(Reducer(undefined, {type:'UPDATE_ARTICLES', articles}), {type:'ADD_ARTICLE', article: addAricle }))
       .to.eql({...state, articles: {...state.articles, articles:newArticles }})
	})
})