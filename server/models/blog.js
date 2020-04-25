const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    author: { type: String, required: true},
    content: {type: String, required: true},
    date: {type: Number, required: true},
    likes: {type: Number},
    comment: {type: String},
    commentClient: {type: mongoose.Schema.Types.ObjectId, ref: 'client'},
    numComments: {type: Number}
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports=Blog;