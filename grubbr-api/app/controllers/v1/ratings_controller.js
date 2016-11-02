const Nodal = require('nodal');
const cloudinary = require('cloudinary');

const Rating = Nodal.require('app/models/rating.js');

const defaultResponse = [
  { adjective: ['memo'] },
  { dish: ['name', 'id', { menuType: ['memo'] },
  { restaurant: ['id', 'name'] }] },
  'id',
  { user: ['name', 'id'] },
  'image',
  'rating',
  'review',
  'created_at',
];

class V1RatingsController extends Nodal.Controller {

  index() {
    Rating.query()
      .join('adjective')
      .join('dish__menuType')
      .join('dish__restaurant')
      .join('user')
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models, defaultResponse);
      });
  }

  show() {
    Rating.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }

  create() {
    cloudinary.uploader.upload(this.params.body.image, function (result) {
      const imageURL = result.secure_url ? result.secure_url : null;
      const newRatingFields = {
        image: imageURL,
        review: this.params.body.review,
        rating: this.params.body.rating,
        dish_id: this.params.body.dish_id,
        user_id: this.params.body.user_id,
        adjective_id: this.params.body.adjective_id,
      };
      Rating.create(newRatingFields, (err, model) => {
        this.respond(err || model);
      });
    }.bind(this));
  }

  update() {
    Rating.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }

  destroy() {
    Rating.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
}

module.exports = V1RatingsController;
