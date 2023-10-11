import { createLogger } from '~/src/helpers/logging/logger'
import { fetchEntities } from '~/src/helpers/db/fetch-entities'

const logger = createLogger()

async function populateApi(mongo, db) {
  const entitiesCollection = db.collection('entities')

  try {
    const entities = await fetchEntities()

    const session = mongo.startSession()
    session.startTransaction()

    if (entities.length) {
      await entitiesCollection.deleteMany({})
      await entitiesCollection.insertMany(entities)
      logger.info(`Updated ${entities.length} entities`)
    }

    await session.commitTransaction()
    logger.info('Completed data population')
  } catch (error) {
    logger.error(error)
  }
}

export { populateApi }
