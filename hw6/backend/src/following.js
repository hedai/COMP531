module.exports = app => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', putFollowing)
	app.delete('/following/:user', deleteFollowing)
}

const following = ['hd15', 'hd15test']

const getFollowing = (req, res) => {
	const user = req.params.user ? req.params.user: 'hd15'
	//Hard code the return value;
    res.send({ 
    	username:user,
     	following:following 
    })
}

const putFollowing = (req, res) => {
	const user = req.params.user
	if(!user){
		res.status(400).send({result:"Invalid input!"})
		return
	}
	following.push(user)
	//Stub the default user name as hd15 for now.
	res.send({ 
		username:'hd15',
     	following:following
    })	
}

const deleteFollowing = (req, res) => {
	const user = req.params.user
	if(!user){
		res.status(400).send({result:"Invalid input!"})
		return
	}
	var index = following.indexOf(user)
	following.splice(index, 1)
	res.send({ 
		username:'hd15',
     	following:following
    })	
}