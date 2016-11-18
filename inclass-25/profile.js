const isLoggedIn = require('./auth.js').isLoggedIn
const Profile = require('./model.js').Profile
const uploadImage = require('./uploadCloudinary')

exports.setup = function(app) {
     //app.use(isLoggedIn)
     app.get('/headlines/:users?', getUserHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getUserEmail)
     app.put('/email', putEmail)
     app.get('/dob', getDob)
     app.get('/zipcode/:user?', getUserZip)
     app.put('/zipcode', putZip)
     app.get('/avatars/:user?', getUserAvatar)
     app.put('/avatar', uploadImage('avatar'), putAvatar)
}

const headlines = [{username:'hd15', headline:'Happy'},
                 {username:'Jack', headline:'Very Happy'},
                 {username:'Scott', headline:'Very Very Happy'}]

const email = [{username:'hd15', email:'hd15@rice.edu'},
              {username:'Jack', email:'jack@rice.edu'},
              {username:'Scott', email:'scott@rice.edu'}]

const zipcodes = [{username:'hd15', zipcode:'77005'},
                {username:'Jack', zipcode:'77006'},
                {username:'Scott', zipcode:'77007'}]

const avatar = [{username:'hd15', avatar:'url1'},
              {username:'Jack', avatar:'url2'},
              {username:'Scott', avatar:'url3'}]

const profile = {
        email: 'foo@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
    }

const getUserHeadline = (req, res) => {
    // we will want middleware to supply this value
    // for now we provide a default
    console.log('call getUserHeadline', req.username)
    if (!req.user) req.user = 'hd15'
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    res.send({ headlines: headlines.filter((headlines) => {
              for (let i = 0; i < users.length; i++) {
               if (headlines.username == users[i])
                    return true
              }})
     })
}

const putHeadline = (req, res) => {
     console.log('call putHeadline', req.body)
     const headline = req.body.headline
     if(!headline) {
          res.status(400).send("No headline! Invalid input")
          return
     }
     headlines.filter((headlines) => {return headlines.username == 'hd15'})[0].headline = headline
     res.send({
          username: 'hd15',
          headline: headline
     })
}
// req.params.users
const getUserEmail = (req, res) => {
     console.log('call getUserEmail', req.body)
     if (!req.user) req.user = 'hd15'
     const username = req.params.user ? req.params.user : req.user  
     res.send({
          username: username,
          email: profile.email
     })
}

const putEmail = (req, res) => {
     console.log('call putEmail', req.body)
     const email = req.body.email 
     if(!email) {
          res.status(400).send("No email! Invalid input")
          return
     }
     profile.email = email
     res.send({
          username: 'hd15',
          email: email
     })
}

//stub for now
const getDob = (req, res) => {
    console.log('call getDob', req.body)
     res.send({
          username: 'hd15',
          dob: '1992/10/21'
     })
}

const getUserZip = (req, res) => {
  console.log('call getUserZip', req.body)
     if (!req.user) req.user = 'hd15'
     const username = req.params.user ? req.params.user : req.user  
     res.send({
          username: username,
          zipcode: profile.zipcode
     })
}

const putZip = (req, res) => {
  console.log('call putZip', req.body)
     const zipcode = req.body.zipcode 
     if(!zipcode) {
          res.status(400).send("No zipcode! Invalid input")
          return
     }
     profile.zipcode = zipcode     
     res.send({
          username: 'hd15',
          zipcode: zipcode
     })
}

const getUserAvatar = (req, res) => {
  console.log('call getUserAvatar', req.body)
     if (!req.user) req.user = 'hd15'
     const username = req.params.user ? req.params.user : req.user  
     res.send({ avatars: [{
          username: username,
          avatar: profile.avatar
     }]})
}

const putAvatar = (req, res) => {
  console.log('call putAvatar', req.body)
     const avatar = req.fileurl
     if(!avatar) {
          res.status(400).send("No avatar! Invalid input")
          return
     }
     profile.avatar = avatar     
     res.send({
          username: 'hd15',
          avatar: avatar
     })     
}