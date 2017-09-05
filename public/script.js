console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  fetch('http://mutably.herokuapp.com/books', { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      const books = json.books
      books.forEach(book => {
        const li = $(`<li>`).text(book.title)
        li.appendTo('.list-group')
      })
    })
});
