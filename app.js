const express = require('express')
const exphbs  = require('express-handlebars');

const app = express()
const port = 5000

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Middleware example
//app.use((req,res,next) => {
//    req.name = 'Testing 01 ' + Date.now()
//    next()
//})


// Index route
app.get('/',(req,res) => {
    // console.log(req.name)
    // res.send('INDEX3 ' + req.name)
    const title = 'Welcome2'
    res.render('index',{
        mytitle: title
    })
})

// About route
app.get('/about',(req,res) => {
    res.render('about')
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


