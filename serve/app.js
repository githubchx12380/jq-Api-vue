const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(require('cors')())
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/upload',express.static(__dirname + '/upload'))
app.use('/public',express.static(path.join(__dirname,'/public')))
app.set('selects','qweoiqweoiqpeipqiwoe')
require('./routes/router')(app)
app.listen(3000,function () {
    console.log('http://localhost:3000')
})
