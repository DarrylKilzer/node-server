var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var server = express();
var port = 3000;

//database area
var mongoose = require('mongoose');
var connectionstring = 'mongodb://darryl:darryl@ds059125.mlab.com:59125/books'
var connection = mongoose.connection;

mongoose.connect(connectionstring, {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', function (er) {
  console.log('THERE WAS A CONNECTION PROBLEM', err)
})

connection.once('open', function () {
  console.log('We are now connection to the books database')
  server.listen(port, function () {
    console.log("The server is working and listening for requests on port: ", 'http://localhost:' + port)
  })
})

//Parses the request data into json
//gives access to 'req.body'
server.use(bodyParser.json())
server.use(cors())
server.use('/', express.static(`${__dirname}/public/`))

//get requests below here
server.get('/books', function (req, res, next) {
  Book.find({}).then(function (books) {
    res.send(books)
  })
})

server.get('/books/:id', function (req, res, next) {
  var id = req.params.id
  Book.findById(id)
    .then(function (books) {
      res.send(books)
    }).catch(function (e) {
      res.send(e)
    })
})

//add requests here
server.post('/books', function (req, res, next) {

  var newBook = req.body

  Book.create(newBook).then(function (newlyCreatedBook) {
    res.send(newlyCreatedBook)
  })
})

//edit requests here
server.put('/books/:id', function (req, res, next) {
  var id = req.params.id
  var changeBook = req.body

  Book.findByIdAndUpdate(id, changeBook)
    .then(function (book) {
      res.send(book)
    })
})

//remove requests here
server.delete('/books/:id', function (req, res, next) {
  var id = req.params.id
  var removeBook = req.body

  Book.findByIdAndRemove(id, removeBook)
    .then(function (book) {
      res.send(book)
    })
})

//this defines a book in the database
var Schema = mongoose.Schema
var BookSchema = new Schema({
  title: { type: String, required: true },
  published: { type: String, required: true },
  rating: { type: String, required: true },
  author: { type: String, required: true }
});

var Book = mongoose.model('Book', BookSchema)