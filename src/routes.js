const express = require('express')
const routes = express.Router()
const ProductController = require('./controllers/ProductController')

routes.get('/', (req, res) => { res.render('index', data = { page: 'home', title: "Home" }) })

routes.get('/produtos', ProductController.index)
routes.post('/produtos/store', ProductController.store)

module.exports = routes