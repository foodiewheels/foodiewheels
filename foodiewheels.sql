CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  username VARCHAR (25) UNIQUE,
  email VARCHAR (300) UNIQUE,
  password VARCHAR,
  lockout_enabled BOOLEAN DEFAULT FALSE,
  lockout_end_date TIMESTAMP,
  registration_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  roles_id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE users_roles (
  users_roles_id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE,
  roles_id INTEGER REFERENCES roles(roles_id) ON DELETE CASCADE,
);

CREATE TABLE users_locations (
  users_locations_id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE,
  location_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT AddGeometryColumn('users_locations', 'geom', 4326, 'POINT');

CREATE TABLE trucks (
  trucks_id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE,
  name VARCHAR (300),
  description VARCHAR (2500),
  owner VARCHAR (300),
  phone INTEGER (10),
  email VARCHAR (300),
  twitter VARCHAR (300),
  instagram VARCHAR (300),
  facebook VARCHAR (300),
  website VARCHAR (400),
  active BOOLEAN DEFAULT TRUE,
  created_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trucks_hours (
  trucks_hours_id SERIAL PRIMARY KEY,
  trucks_id INTEGER REFERENCES trucks(trucks_id) ON DELETE CASCADE,
  sunday VARCHAR (20),
  monday VARCHAR (20),
  tuesday VARCHAR (20),
  wednesday VARCHAR (20),
  thursday VARCHAR (20),
  friday VARCHAR (20),
  saturday VARCHAR (20),
);

CREATE TABLE trucks_locations_current (
  trucks_locations_current_id SERIAL PRIMARY KEY,
  trucks_id INTEGER REFERNCES trucks(trucks_id) ON DELETE CASCADE,
  current_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT AddGeometryColumn('trucks_locations_current', 'geom', 4326, 'POINT');

CREATE TABLE trucks_locations_future (
  trucks_locations_future_id SERIAL PRIMARY KEY,
  trucks_id INTEGER REFERNCES trucks(trucks_id) ON DELETE CASCADE,
  future_datetime TIMESTAMP
);

SELECT AddGeometryColumn('trucks_locations_future', 'geom', 4326, 'POINT');

CREATE TABLE trucks_routes (
  trucks_routes_id SERIAL PRIMARY KEY,
  trucks_id INTEGER REFERNCES trucks(trucks_id) ON CASCADE DELETE,
  routes_datetime TIMESTAMP
);

SELECT AddGeometryColumn('trucks_routes', 'geom', 4326, 'LINESTRING');

CREATE TABLE trucks_menus (
  trucks_menus_id SERIAL PRIMARY KEY,
  trucks_id INTEGER REFERNCES trucks(trucks_id),
  name VARCHAR (300),
  items JSON
);

CREATE TABLE priority (
  priority_id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE trucks_priority (
  trucks_priority_id SERIAL PRIMARY KEY,
  trucks_id INTEGER REFERENCES trucks(trucks_id) ON DELETE CASCADE,
  priority_id INTEGER REFERENCES priority(priority_id)
);

CREATE TABLE trucks_specials (
  trucks_specials_id SERIAL PRIMARY KEY,
  truck_id INTEGER REFERENCES trucks(trucks_id) ON DELETE CASCADE,
  item VARCHAR,
  price VARCHAR,
  active BOOLEAN DEFAULT TRUE,
  created_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
  tags_id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE trucks_tags (
  trucks_tags_id SERIAL PRIMARY KEY,
  trucks_id INTEGER REFERENCES trucks(trucks_id) ON DELETE CASCADE,
  tags_id INTEGER REFERENCES tags(tags_id) ON DELETE CASCADE
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO foodiewheels_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO foodiewheels_user;