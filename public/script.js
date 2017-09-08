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
  update: function(bookId, book) {
    console.log(book)
    return fetch(`http://mutably.herokuapp.com/books/${bookId}`, { method: 'PUT', body: book})
  }
}

var UI = {
  showBooks: function(books) {
    books.forEach(book => {
      const button = $('<button>').text('Edit').attr('class', 'edit')
      const title = $('<span>').text(book.title).attr('class', 'title')
      const saveButton = $('<button>').text('Save').attr('class', 'save').hide()
      const editField = $('<input>').attr('value', book.title).hide()
      const bookLi = $('<li>')
        .append(button)
        .append(title)
        .append(saveButton)
        .append(editField)
        .attr({
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
    const id = $(event.target).parent().attr('id')
    $(event.target).hide()
      .next().hide()
        .next().show()
          .next().show()
    console.log($(event.target).siblings('.save'))
    $(event.target).nextAll('.save')
      .on('click', function(event) {
        const newTitle = $(event.target).next().val()
        console.log(newTitle)
        console.log(id)
        CONTROLLER.editBook(id, { 
          title: newTitle
        })
      })
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
  },
  editBook: function(bookId, book) {
    MODEL_BOOKS.update(bookId, book)
  }
}
