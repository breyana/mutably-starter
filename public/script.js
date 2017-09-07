$(document).ready(function(){
  fetch('http://mutably.herokuapp.com/books', { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      const books = json.books
      books.forEach(book => {
        const button = $('<button>').text('Edit').attr('class', 'edit')
        const title = $('<span>').text(book.title).attr('class', 'title')
        const bookLi = $('<li>').append(button).append(title).attr({
          class: 'book',
          id: book._id
      })
        bookLi.appendTo('.list-group')
      })
    })
});
