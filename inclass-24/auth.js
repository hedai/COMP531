var User = require('./model.js').User
var redis = require('redis').createClient('redis://h:p56ukb0drsrshpb03puuukesna2@ec2-54-221-223-128.compute-1.amazonaws.com:10869')

var cookieKey = 'sid'
const md5 = require('md5')
var pepper = md5("This is my secret peeper!")

const register = (req, res) => {
    console.log('call register()', req.body)
    var username = req.body.username
    var password = req.body.password
    var salt = md5(Math.random())
    var hash = md5(password + salt + pepper)
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

// log in to server, set session id and hash cookies
const login = (req, res) => {
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
			var userObj = items[0]
			var salt = userObj.salt
			var hash = userObj.hash
			if(hash != md5(password + salt + pepper)){
				console.log('hash = '+ hash + ' salt = ' + salt)
				res.status(401).send("Wrong password")
				return
			}
			var cookieValue = md5(username)
			redis.hmset(cookieValue, {username})
			res.cookie(cookieKey, cookieValue, {maxAge:3600*1000, httpOnly:true})
			//console.log('set cookies : ', req.cookies)
			var msg = {username: username, result: 'successfully log in'}
			res.status(200).send(msg)
		}
	})
}

const isLoggedIn = (req, res, next) => {
	console.log(req.cookies)
  var sid = req.cookies[cookieKey]

  if(!sid) {
    return res.sendStatus(401) //Unauthorized
  }
  redis.hgetall(sid, function(err, userObj) {
  	console.log(sid + 'mapped to ' + userObj.username)
	if(userObj.username) {
	  req.username = userObj.username
	  next()
	}
	else {
	  res.sendStatus(401)
	}
  })
}

const logout = (req, res) => {
	var sid = req.cookies[cookieKey]
	redis.del(sid)
	res.clearCookie(cookieKey)
	res.send('OK')
}


module.exports = (app) => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', isLoggedIn, logout)
}
