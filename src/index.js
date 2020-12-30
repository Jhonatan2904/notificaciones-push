require('dotenv').config()

var express = require('express');
var morgan = require('morgan');
var path = require('path');
const app = express()

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

//routes
app.use(require('./routes/index'))

//static content
app.use(express.static(path.join(__dirname, 'public')))

//Server 

app.listen(app.get('port'), (req, res) => {
    console.log('Server on port ', app.get('port'))
})