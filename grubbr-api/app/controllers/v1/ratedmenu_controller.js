const Nodal = require('nodal');

class V1RatedmenuController extends Nodal.Controller {

  get() {
    this.respond({message: `GET request to ${this.constructor.name}`});
  }

}

module.exports = V1RatedmenuController;
