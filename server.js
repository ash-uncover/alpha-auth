const path = require('path')
const express = require('express')

const app = express()

const DIST_DIR = path.join(__dirname, 'dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')
const PORT = process.env.PORT || 8080

app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log(`App serving ${HTML_FILE}`)
  console.log('Press Ctrl+C to quit.')
})
