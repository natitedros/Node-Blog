const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
//const { render } = require('express/lib/response')

//connect to mongodb
const dbURI = 'mongodb+srv://Natitedros:12345@node-blog.acul55q.mongodb.net/Node-Blog?retryWrites=true&w=majority'

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs')

//if you want to change the name of your views to templates
// app.set('views', 'templates')

app.listen(3000)

// middleware and static files
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {

    res.redirect('/blogs')

})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

//checks the path inside the blog routes file
app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.render('404', {title: '404'})
})

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: "New Blog 3",
//         snippet: "About my new blog",
//         body: "More about my new blog"
//     })
//     blog.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=> console.log(err))
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err)=> console.log(err))
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById("63945bbb99d756d9c8a883b4")
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=> console.log(err))
// })

