require('dotenv').config()
const express = require('express')
const path = require('path')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT
app.listen(port, () => console.log(`Server is running in port ${port}`))