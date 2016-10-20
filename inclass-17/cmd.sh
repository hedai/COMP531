#!/bin/bash
PORT=3000

echo "GET /"
curl -H 'Content-Type: application/json' http://localhost:${PORT}
echo ""

echo "PUT /headline"
curl -X PUT http://localhost:${PORT}/headline -H 'Content-Type: application/json' -d '{"headline":"this!"}'
echo ""

echo "GET /headlines"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines/:users?
echo ""

echo "Put /email"
curl -X PUT http://localhost:${PORT}/email -H 'Content-Type: application/json' -d '{"email":"hd15@rice.edu"}'
echo ""

echo "GET /email"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/:users?
echo ""

echo "Put /zipcode"
curl -X PUT http://localhost:${PORT}/zipcode -H 'Content-Type: application/json' -d '{"zipcode":"77025"}'
echo ""

echo "GET /zipcode"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/:users?
echo ""

echo "Put /avatar"
curl -X PUT http://localhost:${PORT}/avatar -H 'Content-Type: application/json' -d '{"avatar":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7jGTFWMnD7e5fIaIPSWeQSjVT7Vt1rr3z27Mzt5BBjbN6g505ZCYncw"}'
echo ""

echo "GET /avatars"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars/:users?
echo ""