/*
Inclass-18
He Dai
*/

module.exports = app => {
	 //app.get('/', index)
     app.get('/articles/:id?', getArticles)
     app.post('/article', addArticle)
     app.get('/headlines/:users?', getUserHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:users?', getUserEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:users?', getUserZip)
     app.put('/zipcode', putZip)
     app.get('/avatars/:users?', getUserAvatar)
     app.put('/avatar', putAvatar)
}

var articles = [{ id:1, author: 'Scott', text:'A post' }, 
                { id:2, author: 'Scott', text:'B post' }, 
                { id:3, author: 'Scott', text:'C post' }]

// const index = (req, res) => {
//     res.send({hello:'world'})
// }

const getArticles = (req, res) => {
	if(req.params.id){
		res.send({articles: articles.filter((articles) => {
			return articles.id == req.params.id
		}) })
	} else {
		res.send({articles: articles})
		//console.log({'articles': articles})
	}
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     var newArticle = {id:articles.length+1, author:'Scott', text:req.body.text}
     articles.push(newArticle)    
     res.send({articles: [newArticle]})
}

const getUserHeadline = (req, res) => {
	var user = req.params.users
	res.send({ headlines: [{
		username: user,
		headline: 'Hello Headline!'
	}]})
}

const putHeadline = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		headline: req.body.headline || 'you did not supply it'
	}]})
}
// req.params.users
const getUserEmail = (req, res) => {
	var user = req.params.users
	res.send({ emails: [{
		username: user,
		email: user + '@rice.edu'
	}]})
}

const putEmail = (req, res) => {
	res.send({ emails: [{
		username: 'sep1',
		email: req.body.email || 'you did not supply it'
	}]})
}

const getUserZip = (req, res) => {
	var user = req.params.users
	res.send({ zipcodes: [{
		username: user,
		zipcode: '92501'
	}]})
}

const putZip = (req, res) => {
	res.send({ zipcodes: [{
		username: 'sep1',
		zipcode: req.body.zipcode || 'you did not supply it'
	}]})
}

const getUserAvatar = (req, res) => {
	var user = req.params.users
	res.send({ avatars: [{
		username: user,
		avatar: 'http://www.rice.edu/_images/rice-logo.jpg'
	}]})
}

const putAvatar = (req, res) => {
	res.send({ avatars: [{
		username: 'sep1',
		avatar: req.body.avatar || 'you did not supply it'
	}]})
}