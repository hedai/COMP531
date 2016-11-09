const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()
//app.use(logger('default'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(setCORS)

require('./src/articles.js')(app)
require('./src/profile.js')(app)
require('./src/auth.js')(app)
require('./src/following.js')(app)

function setCORS(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.header('Origin'))
	res.header('Access-Control-Allow-Credentials','true')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	if(req.method == 'OPTION') {
		res.send(200)
	}	
	next()
}

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})