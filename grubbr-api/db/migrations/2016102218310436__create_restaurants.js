'use strict';

const Nodal = require('nodal');

class CreateRestaurants extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102218310436;
  }

  up() {

    return [
      this.createTable("restaurants", [{"name":"name","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("restaurants")
    ];

  }

}

module.exports = CreateRestaurants;
