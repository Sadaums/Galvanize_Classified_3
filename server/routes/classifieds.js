
'use strict';

const express = require('express');

const router = express.Router();

const knex = require('../../knex');

// YOUR CODE HERE
// routes

router.get('/', function(req, res) {
  // console.log("we in the get all request bby");
  knex('classifieds')
  .select(['id', 'title', "description", "price", "item_image"])
    .then((classifieds) => {
        res.json(classifieds);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    knex('classifieds')
        .where('id', id)
        .select(['id', 'title', "description", "price", "item_image"])
        .then((classified) => {
            res.json(classified[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
    knex('classifieds')
        .insert({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            item_image: req.body.item_image
        })
        .returning(['id', 'title', 'description', 'price', 'item_image'])
        .then((classified) => {
            res.json(classified[0]);
        })
        .catch((err) => {
            next(err);
        });
});


router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  knex('classifieds')
    .where('id', id)
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .update(req.body)
    .then((classified) => {
      res.json(classified[0]);
    })
    .catch((err) => {
         next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id)
  let id = req.params.id;
  knex('classifieds')
    .where('id', id)
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .del()
    .then((classified) => {
      res.json(classified[0]);
    })
    .catch((err) => {
         next(err);
    });
});


module.exports = router;
