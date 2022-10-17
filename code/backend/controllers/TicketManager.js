"use strict";

const Ticket = require("../dao/model/Ticket");
const PersistentManager = require("../dao/PersistentManager");

class TicketManager {
  constructor() {}

  async defineTicket(CreateTime, ServiceId, Status, CounterId) {
    const s = new Ticket(null, CreateTime, ServiceId, Status, CounterId);
    return PersistentManager.store(Ticket.tableName, s);
  }

  async updateTicketStatus(TicketId, newStatus) {
    let exists = await PersistentManager.exists(
      Ticket.tableName,
      "TicketId",
      TicketId
    );
    if (!exists) {
      return Promise.reject({
        code: 404,
        result: "Ticket not exists",
      });
    }

    return PersistentManager.update(
      Ticket.tableName,
      { Status: newStatus },
      "TicketId",
      TicketId
    );
  }
}

module.exports = new TicketManager();
