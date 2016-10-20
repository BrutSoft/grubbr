'use strict';

const Nodal = require('nodal');

/* Include this file to enable Model relationships */

/* For example...

  const Post = Nodal.require('app/models/post.js');
  const Comment = Nodal.require('app/models/comment.js');

  Comment.joinsTo(Post, {multiple: true});

*/

const Adjective =  Nodal.require('app/models/adjective.js');
const Dish = Nodal.require('app/models/dish.js');
const DishType = Nodal.require('app/models/dish_type.js');
const Favorite = Nodal.require('app/models/favorite.js');
const MenuType = Nodal.require('app/models/menu_type.js');
const Rating = Nodal.require('app/models/rating.js');
const User = Nodal.require('app/models/user.js');

module.exports = {}; // Don't need to export anything
