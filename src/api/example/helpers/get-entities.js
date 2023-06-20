async function getEntities(db) {
  const cursor = db.collection('products').find({}, { projection: { _id: 0 } })

  return await cursor.toArray()
}

export { getEntities }
