/**
 * Database helper. Returns all objects stored in the example-data collection in mongodb.
 * See src/server/api/common/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param { Db } db
 * @returns { Promise<WithId<Document>[]> }
 */
function findAllExampleData (db) {
  const cursor = db
    .collection('example-data')
    .find({}, { projection: { _id: 0 } })

  return cursor.toArray()
}

/**
 * Finds and returns a single example record from mongodb.
 * See src/server/api/common/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param { Db } db
 * @param { string } id
 * @returns { Promise<WithId<Document> | null> }
 */
function findExampleData (db, id) {
  return db
    .collection('example-data')
    .findOne({ exampleId: id }, { projection: { _id: 0 } })
}

export { findAllExampleData, findExampleData }
