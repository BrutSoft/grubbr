'use strict';

const Nodal = require('nodal');

class CreateUsers extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102000360111;
  }

  up() {

    return [
      this.createTable("users", [{"name":"name", "type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("users")
    ];

  }

}

module.exports = CreateUsers;
