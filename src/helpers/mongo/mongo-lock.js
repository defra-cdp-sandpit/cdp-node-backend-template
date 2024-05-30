import DLocks from 'mongo-distributed-locks'

const acquireLock = async (resource, id) => {
  return await DLocks.lock({ resource, id })
}

const releaseLock = async (lock) => {
  return await DLocks.unlock(lock)
}

const executeLock = async ({ resource, id, fn }) => {
  return await DLocks.exec({ resource, id, fn })
}

export { acquireLock, executeLock, releaseLock }
