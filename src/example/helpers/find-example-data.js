/**
 * Finds and returns a single example record from mongodb.
 * See src/server/api/common/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param { Db } db
 * @param { string } id
 * @returns {Promise<WithId<Document> | null>}
 */
function findExampleData(db, id) {
  return db
    .collection('example-data')
    .findOne({ exampleId: id }, { projection: { _id: 0 } })
}

export { findExampleData }

/**
 * @import { Db, WithId, Document } from 'mongodb'
 */
