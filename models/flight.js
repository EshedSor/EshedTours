const mongoose= require('mongoose');
const schema = mongoose.Schema;

const flightSchema = new schema({
    origin:{
        Country:{
            type:'String',
            required:true
        },
        City:{
            type:'String',
            required:true
        },
        Airport:{
            type:'String',
            required:true
        },
    },
    destination:{
        Country:{
            type:'String',
            required:true
    },
        City:{
            type:'String',
            required:true
    },
        Airport:{
            type:'String',
            required:true
        },
    },
    departure:{
        type:Date,
        required:true
    },
    arrival:{
        type:Date,
        required:true
    },
},
{   methods:{
        getDepartureTime(){},
        getArrivalTime(){},
        getRemainingTickets(){},
        getPlaneSize(){},
        getSoldTickets(){}
},
});

const Flight = mongoose.model('Flights',flightSchema);

module.exports = Flight;