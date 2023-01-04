
const passportLM = require('passport-local-mongoose');
const mongoose= require('mongoose');
const schema = mongoose.Schema

const userSchema = new schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
},{
    methods:{
        getFullname(){},
    }
});

userSchema.plugin(passportLM,{usernameField:'email'});
const User = mongoose.model('Users',userSchema);

module.exports = User;