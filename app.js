const express = require('express')
const morgan = require('morgan')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'templates')

app.listen(3000)

// middleware and static files
app.use(morgan('dev'))
app.use(express.static('public'))


app.get('/', (req, res) => {

    const blogs = [
    {title: "Blog 1", snippet: "This is blog one content"},
    {title: "Blog 2", snippet: "This is blog two content"},
    {title: "Blog 3", snippet: "This is blog three content"}
    ]

    res.render('index', {title: 'Blogs', blogs})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create new Blog" })
})

app.use((req, res) => {
    res.render('404', {title: '404'})
})