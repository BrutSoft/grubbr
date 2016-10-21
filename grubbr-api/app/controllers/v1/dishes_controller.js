'use strict';

const Nodal = require('nodal');
const Dish = Nodal.require('app/models/dish.js');

var defaultResponse = ['id', 'restaurant_id', 'name', {menuType: ['memo']},
                        {dishType: ['memo']}, 'created_at']

const MenuType = Nodal.require('app/models/menu_type.js');

class V1DishesController extends Nodal.Controller {

  index() {

    Dish.query()
      .join('menuType')
      .join('dishType')
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models, defaultResponse);

      });

  }

  show() {

    Dish.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Dish.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Dish.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Dish.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1DishesController;
