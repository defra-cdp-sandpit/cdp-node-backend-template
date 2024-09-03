import { createLogger } from '~/src/helpers/logging/logger.js'

/**
 * @typedef {Db} Db
 */

/**
 * Database helper. Returns all objects stored in the example-data collection in mongodb.
 * See src/server/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param {Db} db
 * @param {ObjectId} id
 * @returns {Promise<any>}
 */
async function deleteExampleData(db, id) {
  const logger = createLogger()
  const { deletedCount } = await db.collection('example-data').deleteOne({
    _id: id
  })
  if (deletedCount === 1) {
    logger.info(`Example ${id.toString()} deleted`)
  }
}

export { deleteExampleData }
/**
 * @import { Db, ObjectId} from 'mongodb'
 */
