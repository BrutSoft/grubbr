'use strict';

const Nodal = require('nodal');

class CreateAdjectives extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102000194881;
  }

  up() {

    return [
      this.createTable("adjectives", [{"name":"memo","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("adjectives")
    ];

  }

}

module.exports = CreateAdjectives;
