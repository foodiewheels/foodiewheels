module.exports = {

  geolocate: {
    geolocate_id: {type: 'increments', nullable: false, primary: true},
    address: {type: 'string', nullable: false, maxlength: 1000},
    state: {type: 'string', nullable: false, maxlength: 2},
    county: {type: 'string', nullable: false, maxlength: 1000},
    zipcode: {type: 'integer', nullable: false},
    datetime: {type: 'dateTime', nullable: false},
    latitude: {type: 'point', nullable: false},
    longitude: {type: 'point', nullable: false}
  },

  menu: {
    menu_id: {type: 'increments', nullable: false, primary: true},
    truck: {type: 'string', nullable: false, maxlength: 1000},
    title: {type: 'string', nullable: false, maxlength: 1000},
    description: {type: 'text', nullable: false},
    items: {type: 'json', nullable: false}
  },

  truck: {
    truck_id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', nullable: false, maxlength: 1000},
    description: {type: 'text', nullable: false},
    owners: {type: 'json', nullable: false},
    phone: {type: 'integer', nullable: false},
    email: {type: 'string', nullable: false, maxlength: 1000},
    website: {type: 'string', nullable: false, maxlength: 1000},
    active: {type: 'boolean', nullable: false}
  },

  user: {
    user_id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', nullable: false, maxlength: 1000},
    email: {type: 'string', nullable: false, maxlength: 1000},
    password: {type: 'string', nullable: false, maxlength: 1000},
  }

};