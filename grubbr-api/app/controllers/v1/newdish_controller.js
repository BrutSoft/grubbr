const Nodal = require('nodal');

const Dish = Nodal.require('app/models/dish.js');
const Rating = Nodal.require('app/models/rating.js');

class V1NewdishController extends Nodal.Controller {

  get() {
    this.respond({ message: `GET request to ${this.constructor.name}. Use a post\
 request to make a new dish.` });
  }

  post() {
    const newDishFields = {
      restaurant_id: this.params.body.restaurant_id,
      name: this.params.body.name,
      menu_type_id: this.params.body.menu_type_id,
    };
    Dish.create(newDishFields, (err, dishModel) => {
      if (err) { this.respond(err); return; }
      const newRatingField = {
        dish_id: dishModel.get('id'),
        user_id: this.params.body.user_id,
        image: this.params.body.image,
        rating: this.params.body.rating,
        review: this.params.body.rating,
        adjective_id: this.params.body.adjective_id,
      };
      Rating.create(newRatingField, (err2, ratingModel) => {
        this.respond(err2 || {
          dishModel: dishModel.toObject(),
          ratingModel: ratingModel.toObject(),
        });
      });
    });
  }

  put() {
    this.badRequest();
  }

  del() {
    this.badRequest();
  }

}

module.exports = V1NewdishController;
