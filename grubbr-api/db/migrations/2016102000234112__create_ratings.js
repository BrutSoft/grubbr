'use strict';

const Nodal = require('nodal');

class CreateRatings extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102000234112;
  }

  up() {

    return [
      this.createTable("ratings", [{"name":"dish_id","type":"int"},{"name":"user_id","type":"int"},{"name":"image","type":"string"},{"name":"rating","type":"int"},{"name":"review","type":"string"},{"name":"adjective_id","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("ratings")
    ];

  }

}

module.exports = CreateRatings;
