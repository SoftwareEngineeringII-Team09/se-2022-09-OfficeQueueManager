"use strict";

const Ticket = require("../dao/model/Ticket");
const PersistentManager = require("../dao/PersistentManager");
const ServiceManager = require("./ServiceManager");
const CounterManager = require("./CounterManager");

class TicketManager {
  constructor() { }

  async defineTicket(CreateTime, ServiceId, Status, CounterId) {
    const t = new Ticket(null, CreateTime, ServiceId, Status, CounterId);
    return PersistentManager.store(Ticket.tableName, t).then((TicketId) => {
      t.TicketId = TicketId;
      return t;
    });
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

  async loadAllTicketsByAttribute(ticketParameterName, value) {
    const tickets = await PersistentManager.loadAllByAttribute(Ticket.tableName, ticketParameterName, value);
    if (tickets.length === 0) {
      return Promise.reject(
        {
          code: 404,
          result: "Ticket table is empty",
        });
    }

    return Promise.resolve(tickets);
  }


  async getNextTicket(counterId) {
    let services = await CounterManager.loadAllCountersByAttribute("CounterId", counterId)
      .then((counters) => counters.map(counter => counter.ServiceId));
    let sortedQueues = await Promise.all(services.map(serviceId => this.loadAllTicketsByAttribute("ServiceId", serviceId)))
      .then((queues) => {
        queues.sort((q1, q2) => q2.length - q1.length).forEach(q => q.sort((t1, t2) => t1.TicketId - t2.TicketId));
        return queues.filter((queue, _index, queues) => queue.length === queues[0].length);
      });

    if (sortedQueues.length === 1)
      return Promise.resolve(sortedQueues[0][0]);
    else {
      let lowestServiceTime = Number.POSITIVE_INFINITY;
      let lowestServiceTimeTicket = {};
      let tickets = sortedQueues.map((queue) => queue[0]);
      for (const ticket of tickets) {
        let serviceTime = await ServiceManager.serviceRowByAttribute("ServiceId", ticket.ServiceId).then((service) => service.ServiceTime);
        if (serviceTime < lowestServiceTime) {
          lowestServiceTime = serviceTime;
          lowestServiceTimeTicket = ticket;
        }
      }
      return Promise.resolve(lowestServiceTimeTicket);
    }
  }
}

module.exports = new TicketManager();
