import * as Path from 'node:path'
// import * as db from '../server/db/db'
import events from './routes/events'

import express from 'express'
// import cors, { CorsOptions } from 'cors'

const server = express()
server.use(express.json())

// API routes here

server.use('/api/v1/events', events)

// server.use(cors('*' as CorsOptions))

// server.get('/api/v1/greeting', (req, res) => {
//   const greetings = ['hola', 'hi', 'hello', 'howdy']
//   const index = Math.floor(Math.random() * greetings.length)
//   console.log(index)
//   res.json({ greeting: greetings[index] })
// })

// console.log('hello there')

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
