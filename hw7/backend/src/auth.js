const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const md5 = require('md5')
const cookieKey = 'sid'
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const secret = 'This is my secret!'
const redis = require('redis').createClient('redis://h:p68ffv8g3b6osl7sc23920v5rg0@ec2-54-221-230-87.compute-1.amazonaws.com:11899')
const sessionUser = {}
const pepper = md5("This is my secret peeper!")


let originHostUrl = ''

const configFacebookAuth = {
  clientSecret: 'f8dbbb000037834256ac3f4ba029813d',
  clientID: '1112689225495962',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true
}

const register = (req, res) => {
    console.log('call register()', req.body)
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const zipcode = req.body.zipcode
    findByUser(username, function(items){
      if(items.length !== 0) {
        res.status(401).send("User already existed")
        return
      }
      else {
        const salt = md5(Math.random() + username + new Date().getTime())
        const hash = md5(password + salt + pepper)
        const newUser = {username: username, salt: salt, hash: hash}
        new User(newUser).save()
        const newProfile = {
          username: username,
          headline: "Think different",
          following: [],
          email: email,
          zipcode: zipcode,
          avatar: "https://s-media-cache-ak0.pinimg.com/originals/b7/a3/a0/b7a3a035e3f4a4bf6c872ca5151330eb.jpg"
        }
        new Profile(newProfile).save()
        res.status(200).send({ result: 'success', username: username})
      }
    })
}

function findByUser(username, callback) {
  User.find({ username: username }).exec(function(err, items) {
    console.log('There are ' + items.length + ' entries for ' + User) 
    callback(items)
  })
}

const login = (req, res) => {
  console.log('call login()', req.body)
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    res.status(400).send("Invalid input")
    return
  }
  //const userObj = getUser(username)
  findByUser(username, function(items) {
    if(items.length === 0) {
      res.status(401).send("User not exist")
      return
    }
    else{
      const userObj = items[0]
      const salt = userObj.salt
      const hash = userObj.hash
      if(hash != md5(password + salt + pepper)){
        console.log('hash = '+ hash + ' salt = ' + salt)
        res.status(401).send("Wrong password")
        return
      }
      console.log('username = ', userObj.username, 'hash = ', hash)
      const sessionKey = md5(pepper + new Date().getTime() + username)
      sessionUser[sessionKey] = userObj
      redis.hmset(sessionKey, {username})
      res.cookie(cookieKey, sessionKey, {maxAge:3600*1000, httpOnly:true})
      console.log('set cookies : ', req.cookies)
      const msg = {username: username, result: 'success'}
      res.status(200).send(msg)
    }
  })
}
//use merge to link all
const merge = (req, res) => {
  const username = req.body.regUsername;
  const password = req.body.regPassword;
  if (!username || !password) {
    res.status(400).send("username or password is missing")
    return
  }
  User.find({username: username}).exec(function(err, users){
        if (!users || users.length === 0){
            res.sendStatus(400)
            return
        }
        const userObj = users[0]
    if(!userObj){
      res.status(400).send("Don't have this user in db")
    }
    const salt = userObj.salt;
    const hash = userObj.hash;

    if(md5(password + salt) === hash){
      //third party username
      Article.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi: true}, function(){})
      Article.update({'comments.author' : req.username}, { $set: {'comments.$.author': username}}, { new: true, multi: true }, function(){})
      Comment.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi: true }, function(){})
      Profile.findOne({username: req.username}).exec(function(err, profile){
        if(profile){
          const oldFollowingArr = profile.following
          Profile.findOne({username: username}).exec(function(err, newProfile) {
            if(newProfile){
              //concat
              const newFollowingArr = newProfile.following.concat(oldFollowingArr)
              Profile.update({username: username}, {$set: {'following': newFollowingArr}}, function(){})
            }
          })
          //delete the profile record
          Profile.update({username: req.username}, {$set: {'following':[]}}, function(){})
        }
      })
      User.findOne({username: username}).exec(function(err, user){
        if(user){
          const usrArr = req.username.split('@');
          const authObj = {}
          authObj[`${usrArr[1]}`] = usrArr[0]
          User.update({username: username}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
        }
      })
      res.status(200).send({ username: username, result: 'success'})
    } else{
      res.status(401).send("incorrect password!")
    }
  })
}

const unlink = (req, res) => {
  const username = req.username
  const company = req.body.company
  User.findOne({username: username}).exec(function(err, user){
    if(user.auth.length !== 0){
      User.findOne({username: username}).exec(function(err,user){
        let authArr = user.auth
        authArr = authArr.filter(function (obj) {
          return Object.keys(obj)[0] !== company;
        })
        User.update({username: username}, {$set: {'auth': authArr}}, {new: true}, function(){})
        res.status(200).send({result: 'successfully unlink ' + company})
      })
    } else {
      res.status(400).send("no link account")
    }
  })
}

const changePassword = (req, res) => {
  console.log('call changePassword()', req.body)
  const username = req.username
  const password = req.body.password
  const salt = md5(Math.random() + username + new Date().getTime())
  const hash = md5(password + salt + pepper)

  const newInfo = {salt: salt, hash: hash}

  //Update user's password
  User.findOneAndUpdate({ username: username }, newInfo)
  .exec(function(err, item) {
    if(!err) {
      res.send({username: username, status: 'success'})
    }
    else {
      res.sendStatus(500)
    }
  })
}

//use Facebook Strategy to login
passport.use(new FacebookStrategy(configFacebookAuth,
  function(req, token, refreshToken, profile, done){
    const username = profile.displayName + "@" + profile.provider
    //check if there is a login user
    const sid = req.cookies[cookieKey]
    if(!sid){
      User.findOne({username: username}).exec(function(err, user) {
        if(!user || user.length === 0){
          const userObj = new User({username: username, authId: profile.id})
          new User(userObj).save(function (err, usr){
            if(err) return console.log(err)
          })
          const profileObj = new Profile({username: username, headline: "login by facebook", following:[], email: null, zipcode: null, dob: new Date(1999,09,09).getTime(), avatar: "http://iconbug.com/data/8a/256/c72e39da5e258b482275a0319d00f7b7.png"})
          new Profile(profileObj).save(function (err, usr){
            if(err) return console.log(err)
          })
        }
        return done(null, profile)
      })
    } else {
      //if there is a local login, link them
      redis.hgetall(sid, function(err, userObj) {
        const localUser = userObj.username
        Article.update({author:username}, { $set: { 'author': localUser}}, { new: true, multi: true }, function(){})
        Article.update({'comments.author' : username}, { $set: {'comments.$.author': localUser}}, { new: true, multi: true }, function(){})
        Comment.update({author:username}, { $set: { 'author': localUser}}, { new: true, multi: true }, function(){})
        Profile.findOne({username: username}).exec(function(err, profileData){
          if(profileData){
            const oldFollowingArr = profileData.following
            Profile.findOne({username: localUser}).exec(function(err, newProfile) {
              if(newProfile){
                //concat
                const newFollowingArr = newProfile.following.concat(oldFollowingArr)
                Profile.update({username: localUser}, {$set: {'following': newFollowingArr}}, function(){})
              }
            })
            //delete the profile record
            Profile.update({username: username}, {$set: {'following':[]}}, function(){})
          }
        })
        User.findOne({username: localUser}).exec(function(err, user){
          if(user){
            let authObj = {}
            authObj[`${profile.provider}`] = profile.displayName
            User.update({username: localUser}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
          }
        })
      })
      return done(null, profile)
    }
  }
))

passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id,done){
  User.findOne({authId: id}).exec(function(err, user) {
    done(null, user)
  })
})

function logout(req,res){
  //have bugs 
  if (req.isAuthenticated()) {
    req.session.destroy()
    req.logout()
    //corner case for link acount
    if(req.cookies[cookieKey] !== undefined){
      const sid = req.cookies[cookieKey]
      redis.del(sid)
      res.clearCookie(cookieKey)
    }
    res.status(200).send("OK")
  } else if(req.cookies[cookieKey] !== null){
    const sid = req.cookies[cookieKey]
    redis.del(sid)
    res.clearCookie(cookieKey)
    res.status(200).send("OK")
  }
}

function isLoggedIn(req, res, next){
  // check if third-party authenticated, if not, then check for our session+cookie
  if (req.isAuthenticated()) {
    const usrArr = req.user.username.split('@');
    const authObj = {}
    authObj[`${usrArr[1]}`] = usrArr[0]
    User.findOne({auth: authObj}).exec(function(err,user) {
      if(!user){
        req.username = req.user.username
      } else {
        req.username = user.username
      }
      next()
    })
  } else{
    const sid = req.cookies[cookieKey]
    if (!sid){
          return res.sendStatus(401)
      }
      redis.hgetall(sid, function(err, userObj) {
        if(err) throw err;
        if(userObj){
          console.log(sid + ' mapped to ' + userObj.username)
          req.username = userObj.username
        next()
      }
      else{
        res.sendStatus(401)
      }
      })
  }
  
}

const successFun = (req,res) => {
  res.redirect(originHostUrl)
}

const errorFun = (err,req,res,next) => {
  // You could put your own behavior in here, fx: you could force auth again...
    // res.redirect('/auth/facebook/');
    if(err) {
        res.status(400);
        res.send({err: err.message});
    }
}

const locationFun = (req, res, next) => {
  if(originHostUrl === ''){
    originHostUrl = req.headers.referer
  }
  next()
}

function setup(app) {
  app.use(cookieParser())

  app.use(locationFun)
  app.use(session({secret:'thisIsMySecretMessage', resave: false, saveUninitialized: false}))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
  app.use('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/login/facebook'}), successFun, errorFun)

  app.post('/login', login)
  app.post('/register', register)

  app.use(isLoggedIn)

  app.use('/link/facebook', passport.authorize('facebook', {scope:'email'}))

  app.post('/unlink', unlink)
  app.post('/merge', merge)
  app.put('/password', changePassword)
  app.put('/logout', logout)
}

module.exports = { setup, isLoggedIn }