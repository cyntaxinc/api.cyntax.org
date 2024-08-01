import mongoose from 'mongoose';

const priorityValues = ['low', 'medium', 'high', 'critical'];
const requestTypeValues = ['website slow', 'website down', 'new feature', 'bug fix', 'feedback', 'other'];
const statusValues = ['unseen', 'observed', 'todo', 'in progress', 'delayed', 'complete'];

const ticketSchema = mongoose.Schema({
  priority: { 
    type: String,
    required: [true, 'Please enter a priority'],
    validate: [(val) => priorityValues.includes(val), 'Please enter a valid priority'],
  },
  requestType: { 
    type: String,
    required: [true, 'Please enter a request type'],
    validate: (val) => requestTypeValues.includes(val),
  },
  requestDetails: { 
    type: String,
    required: [true, 'Please enter a request details'],
  },
  status: { 
    type: String,
    required: [true, 'Please enter the status'],
    validate: (val) => statusValues.includes(val),
  },
  userRequesting: { 
    type: Object,
    required: [true, 'Please enter the user requesting'],
  },
  userAssigned: { 
    type: Object,
    required: [true, 'Please enter the user assigned'],
  },
  notes: { 
    type: String,
  },
  messages: {
    type: String,
  }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;