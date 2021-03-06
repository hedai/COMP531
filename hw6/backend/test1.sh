#!/bin/bash
PORT=3000

echo "GET /headlines/Jack,hd15"
curl http://localhost:${PORT}/headlines/Jack,hd15
echo ""
echo ""

echo "PUT /headline"
curl -H 'Content-Type: application/json' -X PUT http://localhost:${PORT}/headline -d "{ \"headline\":\"This is my new headline!\" }"
echo ""
echo ""

echo "GET /headlines"
curl http://localhost:${PORT}/headlines
echo ""
echo ""

echo "GET /articles"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/articles
echo ""
echo ""

echo "GET /articles/4"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/articles/4
echo ""
echo ""

echo "POST /article"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/article -d "{ \"text\":\"This is my new article!\" }"
echo ""
echo ""

echo "GET /articles"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/articles
echo ""
echo ""

echo "PUT /article/4"
curl -H 'Content-Type: application/json' -X PUT http://localhost:${PORT}/article/4 -d "{ \"text\":\"Change article for PUT\" }"
echo ""
echo ""

echo "GET /articles"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/articles
echo ""
echo ""

echo "GET /email"
curl http://localhost:${PORT}/email
echo ""
echo ""

echo "PUT /email"
curl -H 'Content-Type: application/json' -X PUT http://localhost:${PORT}/email -d "{ \"email\":\"hddd@rec.com\" }"
echo ""
echo ""

echo "GET /email"
curl http://localhost:${PORT}/email
echo ""
echo ""

echo "POST /register"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/register -d '{"username":"hdd", "password":"111", "email":"hd15@rice.edu", "dob": "1992/10/21", "zipcode":"92507"}'
echo ""
echo ""

echo "POST /login"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/login -d '{"username":"hdd", "password":"133"}'
echo ""
echo ""

echo "PUT /logout"
curl -H 'Content-Type: application/json' -X PUT http://localhost:${PORT}/logout
echo ""
echo ""

echo "PUT /password"
curl -H 'Content-Type: application/json' -X PUT http://localhost:${PORT}/password
echo ""
echo ""

echo "GET /following"
curl http://localhost:${PORT}/following
echo ""
echo ""

echo "PUT /following/sss"
curl -H 'Content-Type: application/json' -X PUT http://localhost:${PORT}/following/sss
echo ""
echo ""

echo "DELETE /following/hd15"
curl -H 'Content-Type: application/json' -X DELETE http://localhost:${PORT}/following/hd15 
echo ""
echo ""