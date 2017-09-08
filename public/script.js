$(document).ready(function(){
  CONTROLLER.showBooks()
});

var MODEL_BOOKS = {
  findAll: function() {
    return fetch('http://mutably.herokuapp.com/books', { method: 'GET' })
      .then(response => response.json())
      .then(json => json.books)
  },
  create: function(book) {
    return fetch('mutably.herokuapp.com/books', {method: 'POST', body: book})
  },
  update: function(bookId) {
  }
}

var UI = {
  showBooks: function(books) {
    books.forEach(book => {
      const button = $('<button>').text('Edit').attr('class', 'edit')
      const title = $('<span>').text(book.title).attr('class', 'title')
      const editField = $('<input>').attr('value', book.title)
      const bookLi = $('<li>').append(button).append(title).append(editField).attr({
        class: 'book',
        id: book._id
      })
      bookLi.appendTo('.list-group')
    })
  },
  addBook: function(book) {

  },
  updateBook: function(book) {

  },
  addErrorMessage: function(error) {

  },
  editBook: function(event) {

  },
  addEventListeners: function() {
    $('.edit').on('click', UI.editBook)
  }
}

var CONTROLLER = {
  addBook: function() {
    var book = {} // use document.querySelector to get the book from the form
    MODEL_BOOKS.create(book)
    .then( createdBook => {
      UI.addBook(createdBook)
    })
    .catch( error => {
      // update the DOM s
      UI.addErrorMessage(error)
    })
  },
  showBooks: function() {
    MODEL_BOOKS.findAll()
      .then(books => {
        UI.showBooks(books)
        UI.addEventListeners()
      })
  }
}
