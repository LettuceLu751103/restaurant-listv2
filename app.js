const express = require('express')
const session = require('express-session')
const port = 3000

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

const exphbs = require('express-handlebars')

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

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening on http:/localhost:${port}`)
})