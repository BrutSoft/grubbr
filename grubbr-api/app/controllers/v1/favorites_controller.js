'use strict';

const Nodal = require('nodal');
const Favorite = Nodal.require('app/models/favorite.js');

class V1FavoritesController extends Nodal.Controller {

  index() {

    Favorite.query()
      .join('user')
      .join('dish__menuType')
      .join('dish__dishType')
      .where(this.params.query)
      .end((err, models) => {

        models[0].joined('dish');
        models[0].joined('dish').joined('menuTypes');
        models[0].joined('dish').joined('dishTypes');

        this.respond(err || models, [{dish: ['name', 'restaurant_id', {menuType: ['memo']}, {dishType: ['memo']} ] },
                                        {user: ['id']}]);

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
