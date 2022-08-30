const Album = require('../models/albumModel');
const Song = require('../models/songModel');
const Artist = require('../models/artistModel');
const Review = require('../models/reviewModel');
const List = require('../models/listModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

/* { user: req.user.id } */

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

//C
const createReview = async (req, res) => {
  if(!req.body.review) {
    res.status(400).send('Review not saved. Please enter a review');
  }

  const review = new Review({
    user: req.user.id,
    album: req.body.album,
    dateListened: req.body.dateListened,
    review: req.body.review,
    rating: req.body.rating,
    like: req.body.like
  });

  try {
    await review.save();

    res.status(201).json({ review });
  }
  catch(e) {
    res.status(500).json({ error: e.message });
  }
}

const createList = async (req, res) => {
  if(!req.body.name || !req.body.albums)
    return res.status(400).json({ message: 'List not saved. Please enter a list'});

  try {
    const review = new List({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description
    });
    await review.save();

    return res.status(201).json({ review });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const createAlbum = asyncHandler(async (req, res) => {
  if(!req.body.title || !req.body.artist || !req.body.albumCover || !req.body.releaseDate) {
    res.status(400);
    throw new Error('Album not saved. Please enter all fields');
  }

  const album = new Album({
    title: req.body.title,
    artist: req.body.artist,
    albumCover: req.body.albumCover,
    releaseDate: req.body.releaseDate
  });
  await album.save();

  res.status(201).json({ album });
})

const createAlbums = async (req, res) => {
  try {
    await Album.insertMany(req.body);

    res.status(201).send('Albums inserted successfully! 🙌🏽');
  }
  catch(e) {
    if(e.code == 11000)
      return res.json({ conflict: 'the albums already exist.' });
    return res.status(500).json({ error: [e.code, e.message] });
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if(!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //check if the user is already registered
  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error('User already registered');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword
  });

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  }
  else {
    res.status(400);
    throw new Error('Invalid user data');
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //check for user email
  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  }
  else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
})

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
    const reviews = await Review.find({ user: req.user.id }).populate('album');
    
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
    const lists = await List.find({ user: req.user.id });
    
    if(lists)
      return res.status(200).json({ lists });

    return res.status(404).json({ message: 'Invalid request. List not found.' });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    
    if(album)
      return res.status(200).json({ album });

    return res.status(404).json({ message: 'Album not found. Check provided id for typos.' });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    
    if(albums)
      return res.status(200).json({ albums });

    return res.status(404).json({ message: 'Invalid request. Albums not found.' });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);  //the user will be whichever is the one that's authenticated
})

//U
const updateReview = asyncHandler(async (req, res) => {
  try {
    if(!req.body.review) {
      res.status(400);
      throw new Error('Review not updated, text field must not be empty.');
    }
    
    //check for user
    if(!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
    
    const { id } = req.params;
    const review = await Review.findById(id);

    //make sure that the logged in user matches the review user
    if(review.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    Review.findByIdAndUpdate(id, req.body, { new: true }, (e, review) => {
      if(e != null) {
        console.log(e, 'error');
        res.status(404).send(message);
      }
      else {
        console.log(review);
        res.status(200).json(review);
      }
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
})

const updateList = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id);
    
    //check for user
    if(!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    //make sure that the logged in user matches the review user
    if(list.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

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
})

//D
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    
    //check for user
    if(!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    //make sure that the logged in user matches the review user
    if(review.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const deleted = await Review.findByIdAndDelete(id);
    
    if(deleted)
      return res.status(200).send('Review deleted successfully.');

    throw new Error('Review not found');

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
})

const deleteList = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id);
    
    //check for user
    if(!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    //make sure that the logged in user matches the review user
    if(list.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const deleted = await List.findByIdAndDelete(id);
    
    if(deleted)
      return res.status(200).send('List deleted successfully.');

    throw new Error('List not found');

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
})

module.exports = {
  createReview,
  createList,
  createAlbum,
  createAlbums,
  registerUser,
  loginUser,
  getUser,
  getReviewById,
  getAllReviews,
  getListById,
  getAllLists,
  getAlbumById,
  getAllAlbums,
  updateReview,
  updateList,
  deleteReview,
  deleteList
}