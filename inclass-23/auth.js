
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var config = {
  clientSecret: 'f8dbbb000037834256ac3f4ba029813d',
  clientID: '1112689225495962',
  callbackURL: 'http://localhost:3000/callback'
}

module.exports = (app) => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', logout)
     app.put('/password', password)

     app.use(session({ secret: 'thisIsMySecretMsg'}))
     app.use(passport.initialize())
     app.use(passport.session())

     app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}))
     app.get('/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect: '/fail'}))
     app.get('/profile', isLoggedIn, profile)
     app.get('/fail', fail)     
}

var users = {};
// serialize the user for the session
passport.serializeUser(function(user, done){
  console.log(user)
  users[user.id] = user
  done(null, user.id)
})
//deserialize the user from the session
passport.deserializeUser(function(id, done){
  console.log(users[id])
  var user = users[id]
  done(null, user)
})
passport.use(new FacebookStrategy(config,
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
          return done(null, profile);
      })
  })
)

function register(req, res) {
    console.log('call register()', req.body)
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const dob = req.body.dob
    const zipcode = req.body.zipcode
	if(!username || !password || !email || !dob || !zipcode){
		res.status(400).send({result:"Invalid input!"})
		return
	}
	res.send({
		result:'success',		
		username:username
	})
}

function login(req, res) {
	console.log('call login()', req.body)
	const username = req.body.username
	const password = req.body.password
	if (!username || !password) {
		res.status(400).send("Invalid input")
		return
	}
	// some logic function to verify login TODO in later homework
	res.send({
		username:username,
		result:'success'
	})
}

function logout(req, res) {
	res.send('OK')
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

function password(req, res) {
	const newPW = req.body.password
	res.send({
		username:'hd15',
		status:'will not change'
	})
}

function profile(req, res) {
  res.send({'ok now what?': req.user})
}

function fail(req, res) {
  res.send('fail', req.user)
}
