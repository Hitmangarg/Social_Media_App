const Like =require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike =async function(req,res){
    try{
        //likes/toggle/?id=abcdef&type=post
        let likeable;
        let deleted=false;

        if(req.query.type=='Post'){
            likeable =await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable= await Comment.findById(req.query.id).populate('likes');
        }
        //check if a like already exists
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        // check if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            deleted=true;
            likeable.save();
        }
        else{
            //else make a new like
            let newlike =await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type

            });
            likeables.likes.push(like._id);
            likeable.save();
        }
        return res.json(200)
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}