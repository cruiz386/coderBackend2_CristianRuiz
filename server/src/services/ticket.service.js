import { TicketModel } from "../daos/models/ticket.model.js";

export class TicketService {
    async createTicket({ purchaser, amount, products }) {
        if (!purchaser || !amount || !products) {
            throw new Error("Missing ticket details.");
        }
        
        const ticket = await TicketModel.create({
            code: `TICKET-${Date.now()}`,
            purchase_datetime: new Date(),
            amount,
            purchaser,
        });
        return ticket;
    } 
}
  