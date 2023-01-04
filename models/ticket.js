
const mongoose= require('mongoose');
const schema = mongoose.Schema

const ticketSchema = new schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    passportID:{type:String,required:true},
    price:{type:Number},
    seat:{type:Number},
},{
    methods:{
    }
});

const Ticket = mongoose.model('Tickets',ticketSchema);

module.exports = Ticket;