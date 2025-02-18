const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {        // title of the event
        type: String,
        required: true
    },
    description: { // description of the event
        type: String,
        required: true
    },
    date: {         // date of the event
        type: Date,
        required: true
    },
    time: {         // time of the event
        type: String,
        required: true
    },
    duration: {     // duration of the event in minutes
        type: Number,
        required: true
    },
    organizer: {    // user who created the event
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{    // list of users attending the event
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    meetingLink: {  // link to the meeting
        type: String,
        required: true
    },
    status: {    // status of the event
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming'
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;