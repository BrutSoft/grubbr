const Nodal = require('nodal');

const Dishes = Nodal.require('app/models/dish.js')
const Ratings = Nodal.require('app/models/rating.js');

class V1TenderController extends Nodal.Controller {

  get() {
    // get all dishes, compile needed info from other
    // this.respond({ message: `GET request to ${this.constructor.name}`, this: this });

  }

}

module.exports = V1TenderController;
