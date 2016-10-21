'use strict';

const Nodal = require('nodal');
const MenuType = Nodal.require('app/models/menu_type.js');

class V1MenuTypesController extends Nodal.Controller {

  index() {

    MenuType.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    MenuType.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    MenuType.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    MenuType.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    MenuType.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1MenuTypesController;
