const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

const port = process.env.PORT || 3000

require('dotenv').config()
require('./config/database')
require('./config/passport')

const app = express()

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'SEIRRocks',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

const indexRoutes = require('./routes/index')
const calendarRoutes = require('./routes/calendar')

app.use('/', indexRoutes)
app.use('/calendar', calendarRoutes)

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`)
  })
  