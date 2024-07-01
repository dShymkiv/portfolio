const { DataSource } = require('typeorm');

const connectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // postgre username
  password: "postgres", // postgre password
  database: "postgres", // postgre db, needs to be created before
  synchronize: false, // if true, you don't really need migrations
  logging: true,
  entities: ["db/entity/*.entity{.ts,.js}"], // where our entities reside
  migrations: ["db/migrations/*{.ts,.js}"], // where our migrations reside
};

module.exports = new DataSource({
  ...connectionOptions,
});
