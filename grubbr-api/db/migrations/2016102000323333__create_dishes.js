'use strict';

const Nodal = require('nodal');

class CreateDishes extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102000323333;
  }

  up() {

    return [
      this.createTable("dishes", [{"name":"restaurant_id","type":"int"},{"name":"name","type":"string"},{"name":"menu_type_id","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("dishes")
    ];

  }

}

module.exports = CreateDishes;
