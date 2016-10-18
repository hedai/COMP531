
const express = require('express')
const bodyParser = require('body-parser')

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     var newArticle = {id:articles.length+1, author:'Scott', text:req.body.body}
     articles.push(newArticle)    
     res.send(newArticle)
}

const hello = (req, res) => res.send({ hello: 'world' })

const getArticle = (req, res) => res.send({ articles: articles})

var articles = [ { id:1, author: 'Scott', text:'A post' }, 
                 { id:2, author: 'Scott', text:'B post' }, 
                 { id:3, author: 'Scott', text:'C post' } ]

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
