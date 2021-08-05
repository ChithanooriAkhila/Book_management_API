const { json } = require("express");
const express = require("express");
const database = require("./database");

//initialization
const booky = express();

//configuration
booky.use(express.json())


/*
Route        /
Description  Get all books
Access       public
Parameter    none
Methods      GET
 */
booky.get("/", (req, res) => {
    return res.json({ books: database.books })
});

/*
Route        /is
Description  Get Specific book based on isbn
Access       public
Parameter    isbn
Methods      GET
 */
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );
    if (getSpecificBook.length === 0) {
        return res.json({
            error: `no book found for ISBN of ${req.params.isbn}`,
        });
    }
    return res.json({ book: getSpecificBook });
});

/*
Route        /c
Description  Get Specific book based on category
Access       public
Parameter    category
Methods      GET
 */

booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );
    if (getSpecificBook.length === 0) {
        return res.json({
            error: `no book found for category of ${req.params.category}`,
        });
    }
    return res.json({ book: getSpecificBook });
});


/*
Route        /l
Description  Get list of books based on languages
Access       public
Parameter    lang
Methods      GET
 */

booky.get("/l/:language",(req,res)=>{
    const getListBook = database.books.filter(
        (book) => book.language === req.params.language
    );
    if (getListBook.length === 0) {
        return res.json({
            error: `no book found for language of ${req.params.language}`,
        });
    }
    return res.json({ book: getListBook });
}
);

/*
Route        /author
Description  Get all authors
Access       public
Parameter    none
Methods      GET
 */

booky.get("/author",(req,res)=>{
    return res.json({authors:database.author});
});


/*
Route        /author
Description  Get all authors
Access       public
Parameter    id
Methods      GET
 */

booky.get("/author/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );
    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `no Author found for id of ${req.params.id}`,
        });
    }
    return res.json({ authors: getSpecificAuthor });
});

/*
Route        /author/book/
Description  Get all authors based on books
Access       public
Parameter    none
Methods      GET
 */

booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `no author found for book of ${req.params.isbn}`,
        });
    }
    return res.json({ authors: getSpecificAuthor });
});

/*
Route        /publication
Description  Get all publications
Access       public
Parameter    none
Methods      GET
 */

booky.get("/publication",(req,res)=>{
    return res.json({publications:database.publication});
});


/*
Route        /publication
Description  Get all publications
Access       public
Parameter    id
Methods      GET
 */

booky.get("/publication/:id", (req, res) => {
    const getSpecificpublication = database.publication.filter(
        (publications) => publications.id === parseInt(req.params.id)
    );
    if (getSpecificpublication.length === 0) {
        return res.json({
            error: `no publications found for id of ${req.params.id}`,
        });
    }
    return res.json({ publication: getSpecificpublication });
});

/*
Route        /publication/book/
Description  Get list of publications based on book
Access       public
Parameter    isbn
Methods      GET
 */

booky.get("/publication/book/:isbn",(req,res)=>{
    const getSpecificpublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );
    if (getSpecificpublication.length === 0) {
        return res.json({
            error: `no publications found for book of ${req.params.isbn}`,
        });
    }
    return res.json({ publications: getSpecificpublication });
});

/*
Route        /book/add
Description  add new book
Access       public
Parameter    NONE
Methods      POST
 */

booky.post("/book/add",(req,res) => {
    const {newBook}=req.body;
    database.books.push(newBook);
    return res.json({books:database.books});
});

/*
Route        /author/add
Description  add new author
Access       public
Parameter    NONE
Methods      POST
 */

booky.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body;
    database.author.push(newAuthor);
    return res.json({authors:database.author});
});

/*
Route        /publication/add
Description  add new publication
Access       public
Parameter    NONE
Methods      POST
 */

booky.post("/publication/add",(req,res)=>{
    const {newPublication}=req.body;
    database.publication.push(newPublication);
    return res.json({publications:database.publication});
});

/*
Route        /book/update/title/:isbn
Description  update book title
Access       public
Parameter    NONE
Methods      PUT
 */

booky.put("/book/update/title/:isbn",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.title=req.body.newBookTitle;
            return;
        }
    });
    return res.json({books:database.books});
});


/*
Route        /book/update/author
Description  update/add new author for a book
Access       public
Parameter    isbn
Methods      PUT
 */

booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{

    //update book database

    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    //update author database

    database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        }
    });

    return res.json({books:database.books,author:database.author});
});

/*
Route        /publication/update/book
Description  update/add books to publications
Access       public
Parameter    isbn
Methods      PUT
 */

booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication database
    database.publication.forEach((publications) => {
        if(publications.id === req.body.pubId){
            return publications.books.push(req.params.isbn);
        }
    });
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=req.body.paramId;
            return;
        }
    });
    return res.json({books:database.books,publications:database.publication,message:"succesfully updated publications"});
});

/*
Route        /book/delete
Description  delete a book
Access       public
Parameter    isbn
Methods      DELETE
 */

booky.delete("/book/delete/:isbn",(req,res)=>{

    const updatedBookDatabase = database.books.filter((book)=>
        book.ISBN !==req.params.isbn
    );

    database.books=updatedBookDatabase;
    return res.json({books:database.books});
});

/*
Route        /book/delete/author
Description  delete an author from a book
Access       public
Parameter    isbn, author id
Methods      DELETE
 */

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{

    //update the book databse
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newAuthorList=book.author.filter(
            (authors)=>authors !== parseInt(req.params.authorId)
        );
        book.author=newAuthorList;
        return;
        }
    });

    //update author database
    database.author.forEach((authors)=>{
        if(authors.id === parseInt(req.params.authorId)){
            const newBooksList=authors.books.filter(
            (book)=>book.ISBN !== req.params.isbn
        );
        authors.books=newBooksList;
        return;
        }
    });
    return res.json({message:"author was deleted",book:database.books,author:database.author});
});

/*
Route        /author/delete
Description  delete an author
Access       public
Parameter    id
Methods      DELETE
 */

booky.delete("/author/delete/:id",(req,res)=>{

    const updatedAuthorDatabase = database.author.filter((authors)=>
        authors.id !== parseInt(req.params.id)
    );

    database.author=updatedAuthorDatabase;
    return res.json({author:database.author});
});

/*
Route        /publication/delete
Description  delete a publication
Access       public
Parameter    id
Methods      DELETE
 */

booky.delete("/publication/delete/:id",(req,res)=>{

    const updatedPublicationDatabase = database.publication.filter((publication)=>
        publication.id !== parseInt(req.params.id)
    );

    database.publication=updatedPublicationDatabase;
    return res.json({publication:database.publication});
});

/*
Route        /publication/delete/book
Description  delete a book from publication
Access       public
Parameter    id, publication id
Methods      DELETE
 */

booky.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{

    //update publication database
    database.publication.forEach((publications)=>{
        if(publications.id === parseInt(req.params.pubId)){
            const newBooksList=publications.books.filter((book)=>book!==req.params.isbn
        );
        publications.books=newBooksList;
        return;
        }
    });

    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publications=0;
            return;
        }
    })
    return res.json({books:database.books,publications:database.publication})
});

booky.listen(3000, () => console.log("hey akhila!! server is running"));

//HTTP client -> helper who helps you to make http request
