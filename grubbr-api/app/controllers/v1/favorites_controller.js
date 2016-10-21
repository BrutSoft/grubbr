'use strict';

const Nodal = require('nodal');
const Favorite = Nodal.require('app/models/favorite.js');

class V1FavoritesController extends Nodal.Controller {

  index() {

    Favorite.query()
      .join('user')
      .join('dish')
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models, ['user', 'dish']);

      });

  }

  show() {

    Favorite.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Favorite.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Favorite.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Favorite.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1FavoritesController;
