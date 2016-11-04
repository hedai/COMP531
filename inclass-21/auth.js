var User = require('./model.js').User

module.exports = (app) => {
     app.post('/register', register)
     app.post('/login', login)
}

var cookieKey = 'sid'
const md5 = require('md5')

function register(req, res) {
    console.log('call register()', req.body)
    var username = req.body.username
    var password = req.body.password
    var salt = md5(Math.random())
    var hash = md5(password + salt)
    var newUser = {username: username, salt: salt, hash: hash}
    findByUser(username, function(items){
    	if(items.length !== 0) {
    		res.status(401).send("User already existed")
    		return
    	}
    	else {
    		new User(newUser).save()
    		res.status(200).send("successfully registered")
    	}
    })
}

function findByUser(username, callback) {
	User.find({ username: username }).exec(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + User)	
		callback(items)
	})
}

function login(req, res) {
	console.log('call login()', req.body)
	var username = req.body.username
	var password = req.body.password
	if (!username || !password) {
		res.status(400).send("Invalid input")
		return
	}
	//var userObj = getUser(username)
	findByUser(username, function(items) {
		if(!items) {
			res.status(401).send("User not exist")
			return
		}
		else{
			var salt = items[0].salt
			var hash = items[0].hash
			if(hash != md5(password + salt)){
				console.log('hash = '+ hash + ' salt = ' + salt)
				res.status(401).send("Wrong password")
				return
			}
			res.cookie(cookieKey, md5(hash + salt), 
				{maxAge:3600*1000, httpOnly:true})
			var msg = {username: username, result: 'successfully log in'}
			res.status(200).send(msg)
		}
	})
}