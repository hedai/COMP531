/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url('/articles'))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.articles.length).to.be.at.least(3)
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		let oldID
		fetch(url("/article"), {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({"text":"New article A"})
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.id).to.be.exist
			oldID = body.id;
			expect(body.text).to.eql("New article A")
			return fetch(url("/article"), {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({"text":"New article B"})
				   })
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.id).to.equal(oldID+1)
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		let index, randomID
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()				
		})
		.then(body => {
			index = body.articles.length
			randomID = Math.floor(1 + Math.random()*index)
			fetch(url("/articles/" + randomID))
			.then(res => {
				expect(res.status).to.eql(200)	
				return res.json()				
			})
			.then(body => {
				expect(body.articles.length).to.eql(1)
			})
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/0"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()				
		})
		.then(body => {
			expect(body.articles.length).to.eql(0)
		})		
		.then(done)
		.catch(done)
	}, 200)

});
