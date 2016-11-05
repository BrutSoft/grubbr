const Nodal = require('nodal');
const _ = require('underscore');
const Promise = require('bluebird');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLEPLACES_API,
});

const placesSearch = Promise.promisify(googleMapsClient.placesNearby);

const Ratings = Nodal.require('app/models/rating.js');

class V1TenderController extends Nodal.Controller {
  get() {
    const thisLat = this.params.query.latitude;
    const thisLong = this.params.query.longitude;

    const searchOptions = {
      language: 'en',
      location: [thisLat, thisLong],
      rankby: 'distance',
      type: 'restaurant',
    };

    placesSearch(searchOptions).bind(this).then((places) => {
      // create an array of query constructors
      const placesInfo = places.json.results.reduce((summary, place) => {
        const newSummary = summary;
        newSummary[place.place_id] = {
          place_id: place.place_id,
          address: place.vicinity,
          name: place.name,
        };
        return summary;
      }, {});
      const placesIds = places.json.results.map((place) => {
        // return the place id in query ready form.
        return { dish__restaurant_id: place.place_id };
      });
      Ratings.query()
        .join('dish__menuType')
        .join('dish')
        .join('adjective')
        .where(placesIds)
        .end((err, models) => {
          let dishInfo = {};
          // consolidate all info from ratings and dishes into one object
          models.forEach((rating) => {
            // get the dish id this will be compiled under
            const dishID = rating.joined('dish').get('id');
            // check if there is already a property for that dish
            if (dishInfo[dishID] === undefined) {
              // create the one time data for it now.
              dishInfo[dishID] = {};
              dishInfo[dishID].dishID = dishID;
              dishInfo[dishID].dishName = rating.joined('dish').get('name');
              dishInfo[dishID].upvotes = 0;
              dishInfo[dishID].downvotes = 0;
              dishInfo[dishID].score = 0;
              dishInfo[dishID].images = [];
              dishInfo[dishID].restaurantID = rating.joined('dish').get('restaurant_id');
              dishInfo[dishID].restaurantName =
                placesInfo[dishInfo[dishID].restaurantID].name;
              dishInfo[dishID].restaurantAddress =
                placesInfo[dishInfo[dishID].restaurantID].address;
              dishInfo[dishID].adjectives = {};
            }
            // do all the things that are normally done now.
            if (rating.get('rating') === 1) {
              dishInfo[dishID].upvotes += 1;
              dishInfo[dishID].score += 1;
            } else if (rating.get('rating') === -1) {
              dishInfo[dishID].downvotes -= 1; // TODO bad bad david
              dishInfo[dishID].score -= 1;
            }
            if (rating.get('image')) { dishInfo[dishID].images.push(rating.get('image')); }
            // adjectives consolidation
            if (dishInfo[dishID].adjectives[rating.joined('adjective').get('memo')]) {
              dishInfo[dishID].adjectives[rating.joined('adjective').get('memo')] += 1;
            } else {
              dishInfo[dishID].adjectives[rating.joined('adjective').get('memo')] = 1;
            }
          });
          // Put that info into an array
          dishInfo = _.map(dishInfo, info => info);
          // reduce adjective down to a single value
          dishInfo.forEach((dish) => {
            dish.adjective = _.reduce(dish.adjectives, (biggest, count, adj, obj) => {
              return count > obj[biggest] || biggest === null ? adj : biggest;
            }, null);
          });
          // sort randomly
          const temp = dishInfo.slice(0);
          const dishInfoRand = [];
          while (dishInfoRand.length < dishInfo.length) {
            const randDish = Math.floor(Math.random() * temp.length);
            dishInfoRand.push(temp.splice(randDish, 1)[0]);
          }
          // send that array back in response.
          this.respond(dishInfoRand.slice(0, 20));
        });
    });
  }
}

module.exports = V1TenderController;
