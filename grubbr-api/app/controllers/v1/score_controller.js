const Nodal = require('nodal');
const _ = require('underscore');

const Rating = Nodal.require('app/models/rating.js');

class V1ScoreController extends Nodal.Controller {

  get() {
    Rating.query()
      .join('dish')
      .join('dish__restaurant')
      .join('adjective')
      .where({ dish_id: this.params.route.id })
      .end((err, models) => {
        let dishName;
        let dishID;
        let restaurant;
        let score = 0;
        let upvotes = 0;
        let downvotes = 0;
        const images = [];
        const adjectivesCount = {};
        let bestAdjective = null;
        models.forEach((rating) => {
          const vote = rating.get('rating');
          score += vote;
          if (vote === 1) { upvotes += 1; }
          if (vote === -1) { downvotes -= 1; }
          if (rating.get('image') !== null) { images.push(rating.get('image')); }
          if (rating.joined('adjective') !== null) {
            const adjectiveModel = rating.joined('adjective');
            const adjective = adjectiveModel.get('memo');
            if (adjectivesCount[adjective]) {
              adjectivesCount[adjective] += 1;
            } else {
              adjectivesCount[adjective] = 1;
            }
          }
          bestAdjective = _.reduce(adjectivesCount, (best, count, adj) => {
            // console.log(adj);
            if (best === null) { return adj; }
            return count > adjectivesCount[best] ? adj : best;
          }, null);
          if (dishName === undefined) {
            dishID = rating.joined('dish').get('id');
            dishName = rating.joined('dish').get('name');
            restaurant = rating.joined('dish').joined('restaurant').get('name');
          }
        });
        const reviews = models.map(model => model.toObject());
        this.respond(err || { score,
          upvotes,
          downvotes,
          images,
          adjective: bestAdjective,
          dishName,
          dishID,
          restaurant,
          reviews,
        });
      });
    // this.respond({message: `GET request to ${this.constructor.name}`});
  }
}
module.exports = V1ScoreController;