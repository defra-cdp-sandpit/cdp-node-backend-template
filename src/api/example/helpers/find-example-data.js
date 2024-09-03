/**
 * Finds and returns a single example record from mongodb.
 * See src/server/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param { Db } db
 * @param { ObjectId } id
 * @returns {Promise<{}|null>}
 */
async function findExampleData(db, id) {
  return await db
    .collection('example-data')
    .findOne({ _id: id }, { projection: { _id: 0 } })
}

export { findExampleData }
/**
 * @import { Db, ObjectId } from 'mongodb'
 */
