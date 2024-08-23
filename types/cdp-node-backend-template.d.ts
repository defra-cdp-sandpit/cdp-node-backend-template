import { SecureContextOptions, SecureContext } from 'tls'
import { Db, MongoClient } from 'mongodb'
import { LockManager } from 'mongo-locks'

declare module '@hapi/hapi' {
  interface Request {
    db: () => Db
    locker: () => LockManager
  }

  interface Server {
    db: () => Db
    locker: () => LockManager
    mongoClient: () => MongoClient
    getSecureContext: (options?: SecureContextOptions) => SecureContext
  }
}
