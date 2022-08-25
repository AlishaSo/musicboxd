// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const asyncHandler = require('express-async-handler');
const Album = require('../models/albumModel');
const Song = require('../models/songModel');
const Artist = require('../models/artistModel');
const Review = require('../models/reviewModel');
const List = require('../models/listModel');

//C
const createReview = async (req, res) => {
  if(!req.body.review)
    return res.status(400).json({ message: 'Review not saved. Please enter a review'});

  try {
    const review = new Review(req.body);
    await review.save();

    return res.status(201).json({ review });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const createList = async (req, res) => {
  if(!req.body.name || !req.body.albums)
    return res.status(400).json({ message: 'List not saved. Please enter a list'});

  try {
    const review = new List(req.body);
    await review.save();

    return res.status(201).json({ review });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

//R
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    
    if(review)
      return res.status(200).json({ review });

    return res.status(404).json({ message: 'Review not found. Check provided id for typos.' });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    
    if(reviews)
      return res.status(200).json({ reviews });

    return res.status(404).json({ message: 'Invalid request. Reviews not found.' });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id);
    
    if(review)
      return res.status(200).json({ list });

    return res.status(404).json({ message: 'List not found. Check provided id for typos.' });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    
    if(lists)
      return res.status(200).json({ lists });

    return res.status(404).json({ message: 'Invalid request. List not found.' });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

//U
const updateReview = (req, res) => {
  try {
    const { id } = req.params;
    
    Review.findByIdAndUpdate(id, req.body, { new: true }, (e, review) => {
      if(e != null) {
        console.log(e, 'error');
        res.status(404).send(message);
      }
      else {
        console.log(review);
        res.json(review);
      }
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const updateList = (req, res) => {
  try {
    const { id } = req.params;
    
    List.findByIdAndUpdate(id, req.body, { new: true }, (e, list) => {
      if(e != null) {
        console.log(e, 'error');
        res.status(404).send(message);
      }
      else {
        console.log(list);
        res.json(list);
      }
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

//D
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    
    if(deleted)
      return res.status(200).send('Review deleted successfully.');

    throw new Error('Review not found');

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await List.findByIdAndDelete(id);
    
    if(deleted)
      return res.status(200).send('List deleted successfully.');

    throw new Error('List not found');

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createReview,
  createList,
  getReviewById,
  getAllReviews,
  getListById,
  getAllLists,
  updateReview,
  updateList,
  deleteReview,
  deleteList
}