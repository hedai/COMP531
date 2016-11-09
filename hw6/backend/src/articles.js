
module.exports = app => {
     app.get('/articles/:id*?', getArticles)
     app.put('/article/:id', putArticle)
     app.post('/article', postArticle)
}

function article(id, author, text){
	this.id = id
	this.author = author
	this.text = text
	this.date = new Date()
	this.comments = []
}

var articles = [new article(1, 'hd15', 'This is first article A'),
				new article(2, 'hd15test', 'This is second article B'),
				new article(3, 'Scott', 'This is third article C')]

const getArticles = (req, res) => {
	if(req.params.id){
		res.send({articles: articles.filter((articles) => {
			return articles.id == req.params.id
		}) })
	} else {
		res.send({articles: articles})
	}
}

// stub for now
const putArticle = (req, res) => {
	if(!req.body.text || !req.params.id) {
     	res.status(400).send("Invalid input")
     	return
    }
    const tarArticle = articles.filter((articles) => {return articles.id == req.params.id})
    tarArticle[0].text = req.body.text
	res.send({ articles: tarArticle[0]})
}

const postArticle = (req, res) => {
    console.log('Payload received', req.body)
    if(!req.body.text) {
   		res.status(400).send("No text! Invalid input")
   		return
    }
    var newArticle = new article(articles.length+1, 'hd15', req.body.text)
    articles.push(newArticle)    
    res.send({articles:[newArticle]})
}

