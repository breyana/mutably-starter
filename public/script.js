console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  fetch('http://mutably.herokuapp.com/books', { method: 'GET' })
  .then(response => response.json())
  .then(json => {
    const books = json.books
    console.log(books)
    books.forEach(book => {
      const li = $(`<li></li>`).text(book.title)
      console.log(li)
      li.appendTo('.list-group')
    })
  })
});
