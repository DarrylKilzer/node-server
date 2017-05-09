function BookController() {

  var bookService = new BookService;

  function update(book) {
    var output = document.getElementById('output');
    var template = '';
  }

  this.addBookFromForm = function (e) {
    e.preventDefault();
    var form = e.target;
    bookService.addBookFromForm(form, function (book){
      update(book);
    })

  }

}