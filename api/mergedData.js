import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

// ...spread operator in JS: https://github.com/orgs/nss-evening-web-development/discussions/6

// TODO: Get data for viewBook
// const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   // GET SINGLE BOOK
//   getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
//     getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
//       .then((authorObject) => resolve({ ...bookObject, authorObject }));
//   }).catch(reject);
//   // GET AUTHOR
//   // Create an object that has book data and an object named authorObject
// });

// const getBookDetails = async(firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
//   const bookObject = await getSingleBook(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
//   const authorObject = await getSingleAuthor(bookObject.author_id); // this function uses the data response from the bookObject

//   return { ...bookObject, authorObject };
// };

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
    .then(([authorObject, authorBooksArray]) => {
      resolve({ ...authorObject, books: authorBooksArray });
    }).catch((error) => reject(error));
});

// TODO: Get data for viewAuthor green button
// const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleAuthor(firebaseKey).then((authorObject) => {
//     getBooksByAuthor(firebaseKey)
//       .then((authorBooks) => resolve({ ...authorObject, authorBooks }));
//   }).catch(reject);
// });

// const getAuthorBooks = async (firebaseKey) => {
//   const author = await getSingleAuthor(firebaseKey);
//   const authorBooks = await getBooksByAuthor(author.firebaseKey);

//   return { ...author, authorBooks };
// };
// const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
// });

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    console.warn(booksArray, 'Author Books');
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
});

// const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
//   getBooksByAuthor(firebaseKey).then((booksArray) => {
//     const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

//     Promise.all(deleteBookPromises).then(() => {
//       deleteSingleAuthor(firebaseKey).then(resolve);
//     });
//   })
//     .catch(reject);
// });

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
