const Nodal = require('nodal');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLEPLACES_API,
});

class V1PlacesController extends Nodal.Controller {

  get() {
    // this.respond({ message: `GET request to ${this.constructor.name}` });
    // googleMapsClient.geocode({
    //   address: '1600 Amphitheatre Parkway, Mountain View, CA',
    // }, (err, response) => {
    //   if (!err) {
    //     this.respond(response);
    //   }
    // });
    googleMapsClient.places({
      language: 'en',
      location: [29.9511, -90.0715],
      // radius: 5000,
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
