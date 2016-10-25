const Nodal = require('nodal');

const DishesDishType = Nodal.require('app/models/dish_dish_type.js');

class V1DishesDishTypesController extends Nodal.Controller {
  index() {
    DishesDishType.query()
      .join('dish__restaurant')
      .join('dish__menuType')
      .join('dishType')
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models, [
          { dish: [
            'name',
            'id',
            { restaurant: ['name', 'id'] },
            { menuType: ['memo'] },
          ] },
          { dishType: ['memo'] },
        ]);
      });
  }

  show() {
    DishesDishType.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }

  create() {
    DishesDishType.create(this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }

  update() {
    DishesDishType.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }

  destroy() {
    DishesDishType.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
}

module.exports = V1DishesDishTypesController;
