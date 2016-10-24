'use strict';

const Nodal = require('nodal');

const Dish = Nodal.require('app/models/dish.js');
const Rating = Nodal.require('app/models/rating.js');

class V1ScoreController extends Nodal.Controller {

  get() {

    Rating.query()
      .where({dish_id: this.params.route.id})
      .end((err, models) => {
        let score = 0;
        let upvotes = 0;
        let downvotes = 0;
        models.forEach(function (rating) {
          var vote = rating.get('rating');
          score += vote
          if (vote === 1) { upvotes++; }
          if (vote === -1) { downvotes--; }
        });

        this.respond(err || {score: score, upvotes: upvotes, downvotes: downvotes});

      });

    // this.respond({message: `GET request to ${this.constructor.name}`});

  }

  post() {

    this.badRequest();

  }

  put() {

    this.badRequest();

  }

  del() {

    this.badRequest();

  }

}

module.exports = V1ScoreController;
