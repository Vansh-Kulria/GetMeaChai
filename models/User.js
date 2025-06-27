import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String},
    profile_pic:{type:String},
    cover_pic: {type:String},
    username: { type: String , required: true, },
    createdAt: { type: Date, default: Date.now },
})


export default mongoose.models.User || model('User', userSchema);