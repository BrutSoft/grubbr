const Nodal = require('nodal');

const Dishes = Nodal.require('app/models/dish.js');
const Ratings = Nodal.require('app/models/rating.js');

class V1TenderController extends Nodal.Controller {

  get() {
    Dishes.query()
      .where(this.params.query)
      .end((err, models) => {
        if (err) {
          this.respond(err, models);
        }
        const ids = models.map(model => model.get('id'));
        Ratings.query()
          .where({}, { dish_id: ids })
          .end((err2, ratings) => {
            this.respond(err2 || ratings);
          });
      });
  }
}

module.exports = V1TenderController;
