
// const { DB_USER, DB_HOST, DB_PASS, DB } = process.env

const dbConfig = {
  USER: 'postgres',
  HOST: 'localhost',
  DB: 'postgres',
  PASSWORD: 'akhacker@0001',
  port: 5432, // default PostgreSQL port
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

module.exports = dbConfig;