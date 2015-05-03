module.exports = {

  users: {
    users_id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', nullable: false, maxlength: 1000},
    email: {type: 'string', nullable: false, maxlength: 1000},
    password: {type: 'string', nullable: false, maxlength: 1000},
  },

  truck: {
    truck_id: {type: 'increments', nullable: false, primary: true},
    users_id: {type: 'integer', nullable: false, references: 'users.users_id'},
    name: {type: 'string', nullable: false, maxlength: 1000},
    description: {type: 'text', nullable: false},
    owners: {type: 'json', nullable: false},
    phone: {type: 'integer', nullable: false},
    email: {type: 'string', nullable: false, maxlength: 1000},
    website: {type: 'string', nullable: false, maxlength: 1000},
    active: {type: 'boolean', nullable: false}
  },

  current_location: {
    current_location_id: {type: 'increments', nullable: false, primary: true},
    truck_id: {type: 'integer', nullable: false, references: 'truck.truck_id'},
    address: {type: 'string', nullable: false, maxlength: 1000},
    state: {type: 'string', nullable: false, maxlength: 2},
    county: {type: 'string', nullable: false, maxlength: 1000},
    zipcode: {type: 'integer', nullable: false},
    datetime: {type: 'dateTime', nullable: false},
    latitude: {type: 'point', nullable: false},
    longitude: {type: 'point', nullable: false},
    active: {type: 'boolean', nullable: false}
  },

  future_location: {
    future_location_id: {type: 'increments', nullable: false, primary: true},
    truck_id: {type: 'integer', nullable: false, references: 'truck.truck_id'},
    datetime: {type: 'dateTime', nullable: false},
    latitude: {type: 'point', nullable: false},
    longitude: {type: 'point', nullable: false},
    active: {type: 'boolean', nullable: false}
  },

  route: {
    route_id: {type: 'increments', nullable: false, primary: true},
    truck_id: {type: 'integer', nullable: false, references: 'truck.truck_id'},
    datetime: {type: 'dateTime', nullable: false},
    line: {type: 'linestring', nullable: false},
    active: {type: 'boolean', nullable: false}
  },

  menu: {
    menu_id: {type: 'increments', nullable: false, primary: true},
    truck_id: {type: 'integer', nullable: false, references: 'truck.truck_id'},
    title: {type: 'string', nullable: false, maxlength: 1000},
    description: {type: 'text', nullable: false},
    items: {type: 'json', nullable: false},
    active: {type: 'boolean', nullable: false}
  },

  priority: {
    priority_id: {type: 'increments', nullable: false, primary: true},
    truck_id: {type: 'integer', nullable: false, references: 'truck.truck_id'},
    priority: {type: 'integer', nullable: false}
  },

  specials: {
    specials_id: {type: 'increments', nullable: false, primary: true},
    truck_id: {type: 'integer', nullable: false, references: 'truck.truck_id'},
    items: {type: 'json', nullable: false},
    active: {type: 'boolean', nullable: false}
  }

};