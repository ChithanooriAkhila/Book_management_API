let books = [
    {
        ISBN: "12345BOOK",
        title: "Getting started with mern",
        pubdate: "2021-07-07",
        language: "en",
        numpage: 100,
        author: [1, 2],
        publications: [1],
        category: ["tech", "programming", "education", "thriller"],
    },
    {
        ISBN: "12346BOOK",
        title: "Getting started with fswd",
        pubdate: "2021-07-01",
        language: "en",
        numpage: 150,
        author: [1],
        publications: [1],
        category: ["tech", "programming", "education", "thriller"],
    }
];

const author = [
    {
        id: 1,
        name: "akhila",
        books: ["12345BOOK","123456789"]
    },
    {
        id: 2,
        name: "pavan",
        books: ["12345BOOK"]
    }

];

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345BOOK"]
    },
    {
        id: 2,
        name: "readex",
        books: [""]
    }

];

module.exports = { books, author, publication };