const express = require('express')
const session = require('express-session')
const port = 3000
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')
// const mongoose = require('mongoose')
// const Todo = require('./models/todo')
// const db = mongoose.connection
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening on http:/localhost:${port}`)
})