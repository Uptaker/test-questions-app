import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import {hasProjectsFile} from './FileChecker'
import logger from './Logger'

const cookieSecret: string = process.env.COOKIE_SECRET ?? 'YourCookieValueHereToDetectTampering'
const port = process.env.PORT ?? 8999
const app = express()
app.use(cookieParser(cookieSecret))

app.get('/api/health', async function (req, res) {
  return res.sendStatus(204)
})

app.get('/api/*', async function (req: Request, res: Response) {
  res.sendFile(__dirname, '/../build/index.html')
})


function initVerbose() {
  logger.log(`Listening on port: ${port}`)
}

app.use(express.static('build'))

app.listen(port, () => {
  initVerbose()
})