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
          result: `No available Ticket with ${ticketParameterName} = ${value}`
        });
    }

    return Promise.resolve(tickets);
  }


  async getNextTicket(counterId) {
    // Retrieving list of serviceId associated to counterId
    let services = await CounterManager.loadAllCountersByAttribute("CounterId", counterId)
      .then((counters) => counters.map(counter => counter.ServiceId));

    // Retrieving list of tickets (queue) for each serviceId
    let queues = [];
    for (const serviceId of services) {
      await this.loadAllTicketsByAttribute("ServiceId", serviceId)
        .then((queue) => {
          queue = queue.filter(ticket => ticket.Status === "issued");
          if (queue.length !== 0) {
            queues.push(queue)
          }
        })
        .catch((exception) => {
          if (exception.code !== 404)
            Promise.reject(exception);
        });
    }

    // Sorting the queues by length and extracting only the ones with max length. Also handling the case where the queues are empty 
    queues.sort((q1, q2) => q2.length - q1.length).forEach(q => q.sort((t1, t2) => t1.TicketId - t2.TicketId));
    let sortedQueues = queues.filter((queue, index, queues) => queue.length === queues[0].length);
    if (sortedQueues.length === 0) {
      return Promise.reject(
        {
          code: 404,
          result: "Empty queues"
        });
    }

    // Handling case of 1 queue and case of 2 or more queues
    let nextTicket = {};
    if (sortedQueues.length === 1) {
      nextTicket = sortedQueues[0][0];
    }
    else {
      let lowestServiceTime = Number.POSITIVE_INFINITY;
      let tickets = sortedQueues.map((queue) => queue[0]);
      for (const t of tickets) {
        let serviceTime = await ServiceManager.serviceRowByAttribute("ServiceId", t.ServiceId).then((service) => service.ServiceTime);
        if (serviceTime < lowestServiceTime) {
          lowestServiceTime = serviceTime;
          nextTicket = t;
        }
      }
    }

    // Updating status of nextTicket to "closed"
    this.updateTicketStatus(nextTicket.TicketId, "closed");
    return Promise.resolve(nextTicket);
  }
}

module.exports = new TicketManager();
