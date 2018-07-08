const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 5000

// Connec to mongoose
mongoose.connect('mongodb://localhost:27001/vidjot-dev', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Load Idea Model
require('./models/Idea')
const Idea = mongoose.model('ideas')


// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Middleware example
//app.use((req,res,next) => {
//    req.name = 'Testing 01 ' + Date.now()
//    next()
//})


// Index route
app.get('/', (req, res) => {
    // console.log(req.name)
    // res.send('INDEX3 ' + req.name)
    const title = 'Welcome2'
    res.render('index', {
        mytitle: title
    })
})

// Idea Index page
app.get('/ideas',(req,res) => {
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
        res.render('ideas/index', {
            ideas:ideas
        })
    })
})

// About route
app.get('/about', (req, res) => {
    res.render('about')
})


// Add Idea Form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
})


// Process Form
app.post('/ideas', (req, res) => {
    //console.log(req.body)
    //res.send('ok')

    let errors = []
    if (!req.body.title) {
        errors.push({ text: 'Please add a title' })
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add details' })
    }
    if (errors.length) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details,
        })
    } else {
        console.log(req.body)
        const newIdea = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newIdea)
        .save()
        .then(() => {
            res.redirect('/ideas')
        })
    }
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


