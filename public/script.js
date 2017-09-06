console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  fetch('http://mutably.herokuapp.com/books', { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      const books = json.books
      books.forEach(book => {
        const button = $('<button>').text('Edit').attr('class', 'edit')
        const title = $('<span>').text(book.title).attr('class', 'title')
        const bookLi = $('<li>').append(button).append(title).attr('class', 'book')
        bookLi.appendTo('.list-group')
      })
    })
});
