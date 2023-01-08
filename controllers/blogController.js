const Blog = require('../models/blog')


const blog_index = (req, res) => {
    Blog.find().sort( {updatedAt: -1})
        .then((result) => {
            res.render('blogs/index', {title: "Blogs", blogs: result})
        })
        .catch((err) => console.log(err))
}

const blog_details = (req, res)=> {
    const id = req.params.id
    console.log(id)
    Blog.findById(id)
        .then((result)=>{
            res.render('blogs/details', {title: "Blog Details", blog: result})
        })
        .catch((err)=>{
            //if the id doesn't exist
            res.status(404).render('404', { title: "Blog not found!"})
        })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: "Create new Blog" })
}

const blog_create_post = (req, res) =>{
    //console.log(req.body) - holds the object format of the form input frontend data. 
    //we got this by using the app.use(express.urlencoded({ extended: true})) middleware in app.js
    const blog = new Blog(req.body)
    blog.save()
        .then(()=>{
            res.redirect('/')
        })
        .catch((err)=>console.log(err))
}

const blog_delete = (req, res)=> {
    const id = req.params.id
    
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect: '/blogs'})
            // res.redirect('/')
        })
        .catch((err)=>console.log(err))
}

const blog_update_get = (req, res)=> {
    const id = req.params.id
    
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/update', { title: "Update Blog", blog: result})
        })
        .catch((err)=>console.log(err))
}

const blog_update_put = (req, res)=>{
    const id = req.params.id

    Blog.findByIdAndUpdate(id, req.body)
        .then(()=>res.redirect('/'))
        .catch((err)=>console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update_get,
    blog_update_put
}