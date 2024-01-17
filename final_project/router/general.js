const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,5))
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let book = books[isbn]
    res.send(JSON.stringify(book,null,4));
    return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author
    let result = {
        "booksByAuthor": []
    }
    let keys = Object.keys(books)
    for(let key of keys) {
        let book = books[key]
        if(book.author == author) {
            result['booksByAuthor'].push(book)
        }
    }
    res.send(result)
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title
    let result = {
        "booksByTitle": []
    }
    let keys = Object.keys(books)
    for(let key of keys) {
        let book = books[key]
        if(book.title == title) {
            result['booksByTitle'].push(book)
        }
    }
    res.send(result)
    return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn
    let booksByIsbn = books[isbn]
    let review = booksByIsbn.reviews
    res.send(JSON.stringify(review,null,5));
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

