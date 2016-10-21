'use strict';

const Nodal = require('nodal');

class CreateDishTypes extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102000290226;
  }

  up() {

    return [
      this.createTable("dish_types", [{"name":"memo","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("dish_types")
    ];

  }

}

module.exports = CreateDishTypes;
