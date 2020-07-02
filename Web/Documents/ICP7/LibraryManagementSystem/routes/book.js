var express = require('express');
var router = express.Router();
var Book = require('../models/Book.js');

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  let book = new Book({

    isbn: req.body.name,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    published_year: req.body.published_year,
    publisher: req.body.publisher
  });
  console.log("B" + book);
  Book.findByIdAndUpdate(req.params.id, req.body, function (err,post){
    if (err) return next(err);
    res.json(book);
  });
});

router.put('/:id', function(req, res, next){
  Book.findByIdAndUpdate(req.params.id, req.body, function (err,post){
    if (err) return next(err);
    res.json(post);
    console.log("P" + post);
  });
});


/* DELETE BOOK */
router.delete('/:id', function(req, res, next){
  Book.findByIdAndDelete(req.params.id, function (err,post){
    if (err) return next(err);
    res.json(post);
  });
});
  module.exports = router;
