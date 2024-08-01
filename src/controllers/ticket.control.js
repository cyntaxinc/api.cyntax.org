import db from '../models/index.model.js';
import { getResponseSuccess, getResponseError } from '../lib/handleResponse.js';

const parseRequest_toTicketModel = (body) => {
  return {
    priority: body.priority, 
    requestType: body.requestType,
    requestDetails: body.requestDetails,
    status: body.status,
    userRequesting: body.userRequesting,
    userAssigned: body.userAssigned,
    notes: body.notes,
    messages: body.messages
  }
};

const create = async ({ body }, res) => {
  try {
    const parsedTicket = parseRequest_toTicketModel(body);

    const createdTicket = await db.Ticket.create(parsedTicket)
    .catch(error => { throw error }); // Validation handled by mongoose

    return getResponseSuccess({
      res, 
      payload: 'Ticket successfully created!',
      serverMessage: `Ticket for ${createdTicket.userRequesting.email} created`
    });
  }
  catch (error) {
    return getResponseError({ res, error });
  }
}

const controls = {
  create,
};

export default controls;