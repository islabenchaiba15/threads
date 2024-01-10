import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    id:{type: String,required: true},
    username:{type: String,required: true},
    name:{type:String,required: true},
    image:{type:String},
    bio:{type:String},
    threads:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ],
    onboarded:{type: 'boolean',default:false},
    communities:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Community'
        }
    ]

})

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
