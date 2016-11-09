
module.exports = (app) => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', logout)
     app.put('/password', password)
}

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

function password(req, res) {
	const newPW = req.body.password
	res.send({
		username:'hd15',
		status:'will not change'
	})
}