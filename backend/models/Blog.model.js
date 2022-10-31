const { Schema, model } = require("mongoose");

const BlogPost = new Schema({
    author: String,
    published_at: String,
    likes: Number,
    comments: Array,
    title: String,
    blog_content: String,
    image: String,
    tags: String
})

const BlogModel = model( "blogPost" ,BlogPost)

module.exports = BlogModel