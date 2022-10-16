"user strict";

class Ticket {
  static tableName = "Ticket";
  constructor(TicketId, CreateTime, ServiceId, Status, CounterId) {
    this.TicketId = TicketId;
    this.CreateTime = CreateTime;
    this.ServiceId = ServiceId;
    this.Status = Status;
    this.CounterId = CounterId;
  }
}

module.exports = Ticket;
