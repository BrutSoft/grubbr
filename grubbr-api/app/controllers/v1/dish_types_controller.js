'use strict';

const Nodal = require('nodal');
const DishType = Nodal.require('app/models/dish_type.js');

class V1DishTypesController extends Nodal.Controller {

  index() {

    DishType.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    DishType.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    DishType.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    DishType.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    DishType.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1DishTypesController;
