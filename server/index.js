import express from 'express'
import bodyParser from 'body-parser'
import authRouter from './routes/auth-route.js'
import connectDB from './config/database.js'
import * as dotenv from 'dotenv'
import imageRouter from './routes/image-route.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 9000
const jsonParser = bodyParser.json({})
app.use(jsonParser)

await connectDB()

app.get('/', (req, res) => {
  res.send('Welcome To Image Upload')
})

app.use('/api/auth', authRouter)
app.use('/api/image', imageRouter)
app.listen(port, () => {
  console.log('Server is Running on Port', port)
})

