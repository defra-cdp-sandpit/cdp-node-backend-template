import { config } from '~/src/config/index.js'

/**
 * @typedef {ReadPreferenceLike} ReadPreferenceLike
 * @typedef {{mongoUrl: string, databaseName: string, retryWrites: boolean, readPreference: ReadPreferenceLike}} MongoOptions
 */

/**
 * @type {MongoOptions}
 */
export const mongoOptions = {
  mongoUrl: config.get('mongoUri'),
  databaseName: config.get('mongoDatabase'),
  retryWrites: false,
  readPreference: 'secondary'
}
/**
 * @import {ReadPreferenceLike} from 'mongodb'
 */
