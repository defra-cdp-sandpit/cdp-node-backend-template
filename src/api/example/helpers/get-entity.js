async function getEntity(db, entityId) {
  return await db
    .collection('entities')
    .findOne({ entityId }, { projection: { _id: 0 } })
}

export { getEntity }
