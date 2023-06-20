async function fetchEntities() {
  return Promise.resolve([
    {
      entityId: '3a7e15b1-3fb7-4e53-8ece-8eb96c7b6f61',
      name: 'Tractor',
      description: 'A lovely new tractor',
      condition: 'new',
      createdAt: Date.now()
    },
    {
      entityId: 'ed44b365-066c-40cb-9f50-141bbfffcdee',
      name: 'Bike',
      description: 'A used bike',
      condition: 'used',
      createdAt: Date.now()
    }
  ])
}

export { fetchEntities }
