const Post= require('../models/posts.model')

const getAllPosts = async(req,res) =>{
    try {
        const query = req.query;
        const limit = query.limit||3;
        const page = query.page||1;
        const skip = (page-1)*limit;

        const posts = await Post.find().limit(limit).skip(skip);
    
        if (posts.length === 0) {
          return res.status(404).json({ message: 'No posts found' });
        }
    
        
        res.json({status:"success",data:posts});
      } catch (error) {
       
        console.error('Error fetching posts:', error);
        res.status(500).json({status:"fail",data:[]});
      }
}

const getOnePost = async (req, res) => {
    try {
      const { id } = req.params;
  

      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({status:"fail",data:[]});
      }
  
      return res.json({status:"success",data:post});
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({status:"fail",data:[]});
    }
  };

  const addOnePost = async(req,res) =>{
    const newPost = new Post(req.body)
    newPost.save()
    res.status(201).json({status:"success",data:newPost})
  }
  
  const updatePost = async(req,res)=>{
    try{
        const { id } = req.params;
        const updatedCourse = await Post.findByIdAndUpdate(id, { $set: {...req.body} })
        res.status(200).json({status:"success",data:updatedCourse})

    }catch(err){
        res.status(401).json({status:"fail",data:[]})
    }
  }

  const deleteOnePost = async (req,res)=>{
    try{
        const { id } = req.params;
       await Post.deleteOne({_id:id})
        res.status(200).json({status:"success"})

    }catch(err){
        res.status(401).json({status:"fail"})
    }
  }

module.exports ={
    getAllPosts,
    getOnePost,
    addOnePost,
    updatePost,
    deleteOnePost
}