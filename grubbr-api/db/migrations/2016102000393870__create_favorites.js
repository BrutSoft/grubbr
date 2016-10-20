'use strict';

const Nodal = require('nodal');

class CreateFavorites extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102000393870;
  }

  up() {

    return [
      this.createTable("favorites", [{"name":"user_id","type":"int"},{"name":"dish_id","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("favorites")
    ];

  }

}

module.exports = CreateFavorites;
