import Router from 'express'
import * as db from '../db/db'

const router = Router()

//GET'api/v1/events/all:date'
router.get('/all/:date', async (req, res) => {
  const date = String(req.params.date)
  // console.log('hi there')
  try {
    const result = await db.getAllEvents(date)
    res.json(result)
  } catch (error) {
    console.error(`error getting events for date: ${date}) ${error}`)
    res.sendStatus(500)
  }
})

//GET'api/v1/events/last:date'
router.get('/last/:date', async (req, res) => {
  const date = String(req.params.date)
  console.log('hi there last date')
  try {
    const result = await db.getLastEvent(date)
    res.json(result)
  } catch (error) {
    console.error(`error getting events for date: ${date}) ${error}`)
    res.sendStatus(500)
  }
})

//GET'api/v1/events/:id'
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const result = await db.getEventById(id)
    res.json(result)
  } catch (error) {
    console.error(`error getting event id: ${id} ${error}`)
    res.sendStatus(500)
  }
})

//POST'api/v1/events/'
router.post('/', async (req, res) => {
  const newEvent = req.body
  try {
    await db.addEvent(newEvent)
    res.sendStatus(200)
  } catch (error) {
    console.error(`error making event ${error}`)
    res.sendStatus(500)
  }
})

//DEL'api/v1/events/:id'
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteEventById(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`error deleting event id: ${id} ${error}`)
    res.sendStatus(500)
  }
})

//PATCH 'api/v1/events/title/:id

//PATCH 'api/v1/events/location/:id

//PATCH 'api/v1/events/start/:id

//PATCH 'api/v1/events/end/:id

//PATCH 'api/v1/events/lock/:id

//PATCH 'api/v1/events/unlock/:id

export default router
