const express = require("express");
const database = require("./database");

//initialization
const booky = express();

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

booky.listen(3000, () => console.log("hey akhila!! server is running"));

