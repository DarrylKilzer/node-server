var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var port = 3000;

var books = [{
  title: 'first book',
  published: 'tomorrow',
  rating: 'mediocre',
  author: 'not me'
}]
//Parses the request data into json
//gives access to 'req.body'
server.use(bodyParser.json())

//Get requests below here
server.get('/', function (req, res, next) {
  res.send(200, 'The server is listening')
})

server.get('/books', function (req, res, next) {
  res.send(books)
})

server.get('/books/:id', function (req, res, next) {
  var id = req.params.id
  console.log(id)
  if (books[id]) {
    res.send(books[id])
  } else {
    res.send(404, {
      error: {
        message: "Sorry no book at id" + id
      }
    })
  }
})

server.post('/books', function (req, res, next) {

  var newBook = req.body

  if (newBook.title && newBook.published && newBook.rating && newBook.author) {
    books.push(newBook)
    res.send('Book added')
  } else {
    res.send(401, 'sorry you must enter valid book data')
  }
})

server.put('/books/:id', function (req, res, next) {
  var id = req.params.id
  var changeBook = req.body

  if (changeBook.title && changeBook.published && changeBook.rating && changeBook.author) {
    books[id] = changeBook
    res.send('Book edited')
  } else {
    res.send(401, 'sorry you must enter valid book data')
  }
})

server.delete('/books/:id', function (req, res, next){
  var id = req.params.id
  books.splice(id,1)
  res.send('Book Deleted')
})

server.listen(port, function () {
  console.log("The server is working and listening for request on port: ", port)
})