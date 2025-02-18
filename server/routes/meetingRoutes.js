const router = require('express').Router();
const { 
    createMeeting,
    getMeetingById,
    updateMeetingById,
    deleteMeetingById,
    getMeetingsByHost,
    getMeetingsByParticipant,
    endMeeting
} = require('../handlers/Meeting');

// Create a new meeting
router.post('/', createMeeting);

// Get a meeting by id
router.get('/:id', getMeetingById);

// Update a meeting by id
router.put('/:id', updateMeetingById);

// Delete a meeting by id
router.delete('/:id', deleteMeetingById);

// Get all meetings by host
router.get('/host/:id', getMeetingsByHost);

// Get all meetings by participant
router.get('/participant/:id', getMeetingsByParticipant);

// End a meeting and save summary
router.post('/:id/end', endMeeting);

module.exports = router;