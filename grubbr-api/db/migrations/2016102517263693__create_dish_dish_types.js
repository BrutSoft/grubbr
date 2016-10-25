const Nodal = require('nodal');

class CreateDishDishTypes extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016102517263693;
  }

  up() {
    return [
      this.createTable("dish_dish_types", [{"name":"dish_id","type":"int"},{"name":"dish_type_id","type":"int"}])
    ];
  }

  down() {
    return [
      this.dropTable("dish_dish_types")
    ];
  }

}
module.exports = CreateDishDishTypes;
