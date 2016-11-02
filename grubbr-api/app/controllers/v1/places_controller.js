const Nodal = require('nodal');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLEPLACES_API,
});

class V1PlacesController extends Nodal.Controller {

  get() {
    const thisLat = this.params.query.latitude;
    console.log(thisLat);
    const thisLong = this.params.query.longitude;
    console.log(thisLong);
    // this.respond({ message: `GET request to ${this.constructor.name}` });
    // googleMapsClient.geocode({
    //   address: '1600 Amphitheatre Parkway, Mountain View, CA',
    // }, (err, response) => {
    //   if (!err) {
    //     this.respond(response);
    //   }
    // });
    googleMapsClient.placesNearby({
      language: 'en',
      location: [thisLat, thisLong],
      // radius: 16000,
      rankby: 'distance',
      // minprice: 1,
      // maxprice: 4,
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
