const Nodal = require('nodal');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLEPLACES_API,
});

class V1PlacesController extends Nodal.Controller {

  get() {
    const thisLat = this.params.query.latitude;
    const thisLong = this.params.query.longitude;
    googleMapsClient.placesNearby({
      language: 'en',
      location: [thisLat, thisLong],
      // radius: 16000,
      rankby: 'distance',
      // opennow: true,
      type: 'restaurant',
    }, (err, results) => {
      this.respond(results);
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

module.exports = V1PlacesController;
