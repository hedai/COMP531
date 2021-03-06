var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     if(req.url == "/" && req.method == "GET") {
          var payload = { 'hello': 'world' }
     }

     if(req.url == "/articles" && req.method == "GET") {
          var payload = { 'articles': [ { id:1, author: 'Scott', body:'A post' }, 
                                        { id:2, author: 'Scott', body:'A post' }, 
                                        { id:3, author: 'Scott', body:'A post' } ]}
     }

     if(req.url == "/login" && req.method == "POST") {
          var bodyParse = JSON.parse(req.body)
          var payload = { 'username': bodyParse.username, 'result': 'success' }
     }

     if(req.url == "/logout" && req.method == "PUT") {
          var payload = 'OK'
     }

     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}
