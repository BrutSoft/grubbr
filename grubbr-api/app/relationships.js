const Nodal = require('nodal');

/* Include this file to enable Model relationships */

/* For example...

  const Post = Nodal.require('app/models/post.js');
  const Comment = Nodal.require('app/models/comment.js');

  Comment.joinsTo(Post, {multiple: true});

*/

const Adjective = Nodal.require('app/models/adjective.js');
const Dish = Nodal.require('app/models/dish.js');
const DishType = Nodal.require('app/models/dish_type.js');
const Favorite = Nodal.require('app/models/favorite.js');
const MenuType = Nodal.require('app/models/menu_type.js');
const Rating = Nodal.require('app/models/rating.js');
const User = Nodal.require('app/models/user.js');
const DishDishType = Nodal.require('app/models/dish_dish_type.js');

Rating.joinsTo(Adjective, { multiple: true });
Rating.joinsTo(Dish, { multiple: true });
Rating.joinsTo(User, { multiple: true });
Dish.joinsTo(MenuType, { multiple: true });
// Dish.joinsTo(DishType, { multiple: true });
Favorite.joinsTo(User, { multiple: true });
Favorite.joinsTo(Dish, { multiple: true });
DishDishType.joinsTo(Dish, { multiple: true });
DishDishType.joinsTo(DishType, { multiple: true });


module.exports = {}; // Don't need to export anything
