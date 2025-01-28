/**
 *
 * @param {LockManager} locker
 * @param {string} resource
 * @param {Logger|undefined} logger
 * @returns {Promise<*>}
 */
async function acquireLock (locker, resource, logger) {
  const lock = await locker.lock(resource)
  if (!lock) {
    if (logger) {
      logger.error(`Failed to acquire lock for ${resource}`)
    }
    return null
  }
  return lock
}

/**
 *
 * @param {LockManager} locker
 * @param {string} resource
 * @returns {Promise<*>}
 */
async function requireLock (locker, resource) {
  const lock = await locker.lock(resource)
  if (!lock) {
    throw new Error(`Failed to acquire lock for ${resource}`)
  }
  return lock
}

export { acquireLock, requireLock }
/**
 * @import { LockManager } from 'mongo-locks'
 * @import { Logger } from 'pino'
 */
