const dirPrefix = process.env.NODE_ENV === 'development' ? '' : '.dist/server'

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [`${dirPrefix}entities/**/*`],
  migrations: [`${dirPrefix}migrations/**/*`],
  cli: {
    entitiesDir: `${dirPrefix}entities`,
    migrationsDir: `${dirPrefix}migrations`,
  }
}