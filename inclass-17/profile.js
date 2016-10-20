/*
Inclass-17
He Dai
GET /headlines/:user?
PUT /headline
GET /email/:user?
PUT /email
GET /zipcode/:user?
PUT /zipcode
GET /avatars/:user?
PUT /avatar
*/

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getUserHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:users?', getUserEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:users?', getUserZip)
     app.put('/zipcode', putZip)
     app.get('/avatars/:users?', getUserAvatar)
     app.put('/avatar', putAvatar)
}

const index = (req, res) => {
     res.send({ hello: 'world' })
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