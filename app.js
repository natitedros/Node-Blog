const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { render } = require('express/lib/response')

//connect to mongodb
const dbURI = 'mongodb+srv://Natitedros:12345@node-blog.acul55q.mongodb.net/Node-Blog?retryWrites=true&w=majority'

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs')
app.set('views', 'templates')

app.listen(3000)

// middleware and static files
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

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

app.get('/', (req, res) => {

    res.redirect('/blogs')

})

app.get('/blogs', (req, res) => {
    Blog.find().sort( {createdAt: -1})
        .then((result) => {
            res.render('index', {title: "Blogs", blogs: result})
        })
        .catch((err) => console.log(err))
})

app.post('/blogs', (req, res) =>{
    //console.log(req.body) - holds the object format of the form input frontend data. 
    //we got this by using the app.use(express.urlencoded({ extended: true})) middleware.
    const blog = new Blog(req.body)
    blog.save()
        .then(()=>{
            res.redirect('/')
        })
        .catch((err)=>console.log(err))
    
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create new Blog" })
})

app.get('/blogs/:id', (req, res)=> {
    const id = req.params.id
    console.log(id)
    Blog.findById(id)
        .then((result)=>{
            res.render('details', {title: "Blog Details", blog: result})
        })
        .catch((err)=>console.log(err))
})
app.delete('/blogs/:id', (req, res)=> {
    const id = req.params.id
    
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect: '/blogs'})
        })
        .catch((err)=>console.log(err))
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.use((req, res) => {
    res.render('404', {title: '404'})
})