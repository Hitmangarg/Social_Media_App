const mongoose = require('mongoose');

const likeSchema = new moongose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    likeable :{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    onModel:{
        type: String,
        required:true,
        enum:['Post','Comment']
        
    }

},
{
    timestamps:true
});
const Like =mongoose.models('Like',likeSchema);
models.exports = Like;