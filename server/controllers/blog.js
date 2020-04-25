import blogModel from '../models/blog';
import HttpStatus from '../HttpStatus/index';


const blogPost ={
    getAllPosts: (req, res) => {
        blogModel.find()
      .then((posts) => res.json(posts))
      .catch(err => res.status(400).json('Error:'`${err}`));
  },
    getAPost: async (req, res) => {
        await blogModel.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(err => res.status(400).json('Error:'`${err}`));
    },
    createPost: (req, res) => {
        const {title, author, content} = req.body;
        const date = Date.now();
        const numComments = + 1;
        const details = [title, author, content, date];
      
          const valid = (props, data) => props.find((index) => data[index] === undefined || data[index] === '' || data[index] === null);
          if (!valid(details, req.body)) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              status: HttpStatus.UNAUTHORIZED,
              message: 'Fill all required fields',
            });
          }
          const newPost = new blogModel({
            title, author, content, date, numComments
          })
          newPost.save().then(() => res.status(HttpStatus.CREATED).json({
            title: newPost.title,
            post_id: newPost._id,
            author: newPost.author,
            date: newPost.date,
            num_of_comments: numComments,
            message: 'New Post Created!',
          })
          ).catch((err) => {
            res.status(HttpStatus.BAD_REQUEST).json({
              success: false,
              err,
              message: 'New Post Not Created, Check for Errors and Try Again!',
            });
          });
    },
    updatePost: (req, res) =>{
        blogModel.findById(req.params.id)
        .then(post =>{
            post.title = req.body.title;
            post.content = req.body.content;

            post.save()
            .then(() => res.json('Post Updated Successfully'))
            .catch(err => res. status(HttpStatus.BAD_REQUEST).json('Error:' `${err}`))
        })
        .catch(err => res. status(HttpStatus.BAD_REQUEST).json('Error:' `${err}`))
    },
    deletePost: (req, res) =>{
        blogModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post Deleted Succesfully'))
        .catch( err => res.status(HttpStatus.BAD_REQUEST).json('Error:' `${err}`))
    }

}

export default blogPost;