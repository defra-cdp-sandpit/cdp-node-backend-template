/**
 * @typedef {Db} Db
 * @typedef {ObjectId} ObjectId
 */

/**
 * @typedef {object} ExampleData
 * @property {ObjectId} id
 * @property {string} name
 */

/**
 * Database helper. Returns all objects stored in the example-data collection in mongodb.
 * See src/server/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param {Db} db
 * @param {ExampleData} exampleData
 * @returns {Promise<any>}
 */
async function createExampleData(db, exampleData) {
  const newExample = {
    ...exampleData,
    _id: exampleData.id,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const insertResult = await db.collection('example-data').insertOne(newExample)

  return insertResult.insertedId
}

export { createExampleData }
/**
 * @import { Db, ObjectId } from 'mongodb'
 */
