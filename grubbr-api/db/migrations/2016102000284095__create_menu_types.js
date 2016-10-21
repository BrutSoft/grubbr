'use strict';

const Nodal = require('nodal');

class CreateMenuTypes extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102000284095;
  }

  up() {

    return [
      this.createTable("menu_types", [{"name":"memo","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("menu_types")
    ];

  }

}

module.exports = CreateMenuTypes;
