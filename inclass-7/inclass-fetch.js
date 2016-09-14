// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        var promise = fetch(url)
            .then(r => r.json())
            .then(r => numOfWords(r))
            return promise
    }

    function numOfWords(r) {
        var wordMap = {}
        var article = r.articles
        article.forEach(article => {
            var text = doc['text'];
            var words = text.split(" ");
            wordMap[(doc['_id'])] = words.length;
        })
        return wordMap
    }

    function countWordsSafe(url) {
        var promise = countWords(url)
            .catch(function(error){
                return []
            })
            return promise
    }

    function getLargest(url) {
        var promise = fetch(url)
        .then(r => r.json())
        .then(r => findLargest(r))
        return promise
    }

    function findLargest(r) {
        var wordMap ={}
        var article = r.articles
        var maxLen = 0
        var max_id
        for (var i = 0; i < article.length; i++){
             var txt = article[i].text
             var words = txt.split(" ")
             if (maxLen < words.length){
                 maxLen = words.length
                 max_id = article[i]._id
             }
        }             
        return max_id.toString();
    }

    exports.inclass = {
        author: 'He Dai',
        countWords, countWordsSafe, getLargest
    }

})(this);