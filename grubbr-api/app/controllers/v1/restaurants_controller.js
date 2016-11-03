const Nodal = require('nodal');
const Promise = require('bluebird');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLEPLACES_API,
});

const placesSearch = Promise.promisify(googleMapsClient.placesNearby);

class V1RestaurantsController extends Nodal.Controller {

  get() {
    const thisLat = this.params.query.latitude;
    const thisLong = this.params.query.longitude;

    const searchOptions = {
      language: 'en',
      // radius: 16000,
      rankby: 'distance',
      // opennow: true,
      type: 'restaurant',
    }

    if (thisLat && thisLong) { searchOptions.location = [thisLat, thisLong]; }
    if (this.params.query.name) { searchOptions.name = this.params.query.name; }

    placesSearch(searchOptions).bind(this)
    .catch((err) => { this.respond(err); })
    .then((places) => {
      this.respond(places);
    });
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

module.exports = V1RestaurantsController;
