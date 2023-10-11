import { createLogger } from '~/src/helpers/logging/logger'
import { populateApi } from '~/src/helpers/db/populate-api'

const logger = createLogger()

// Populate the DB in this template on startup of the API.
// This is an example to show developers an API with a DB, with data in it and endpoints that query the db.
const populateDb = {
  plugin: {
    name: 'Populate Db',
    register: async (server) => {
      try {
        await populateApi(server.mongoClient, server.db)
      } catch (error) {
        logger.error(error)
      }
    }
  }
}

export { populateDb }
