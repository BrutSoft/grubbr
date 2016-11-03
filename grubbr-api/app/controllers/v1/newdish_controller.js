const Nodal = require('nodal');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const Dish = Nodal.require('app/models/dish.js');
const Rating = Nodal.require('app/models/rating.js');

class V1NewdishController extends Nodal.Controller {

  get() {
    this.respond({ message: `GET request to ${this.constructor.name}. Use a post\
 request to make a new dish.` });
  }

  post() {
    cloudinary.uploader.upload(this.params.body.image, function (result) {
      const imageURL = result.secure_url ? result.secure_url : null;
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
          image: imageURL,
          rating: this.params.body.rating,
          review: this.params.body.review,
          adjective_id: this.params.body.adjective_id,
        };
        Rating.create(newRatingField, (err2, ratingModel) => {
          this.respond(err2 || {
            dishModel: dishModel.toObject(),
            ratingModel: ratingModel.toObject(),
            results: {
              dishID: dishModel.get('id'),
              dishName: dishModel.get('name'),
              image: ratingModel.get('image'),
              review: ratingModel.get('review'),
            },
          });
        });
      });
    }.bind(this));
  }

  put() {
    this.badRequest();
  }

  del() {
    this.badRequest();
  }

}

module.exports = V1NewdishController;
