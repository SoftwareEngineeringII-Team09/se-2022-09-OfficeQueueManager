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

  async updateTicketCounter(TicketId, newCounter) {
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
      { CounterId: newCounter },
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
          queue = queue.filter(ticket => ticket.Status === "issued" && ticket.CounterId === 0);
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

    nextTicket.CounterId = counterId;
    let oldTicket = await this.loadAllTicketsByAttribute("CounterId", counterId)
      .then((tickets) => tickets.filter((ticket) => ticket.Status === "issued")[0])
      .catch((exception) => {
        if (exception.code !== 404)
          Promise.reject(exception);
      });

    // Updating status of oldTicket to "closed"
    if (oldTicket) {
      await this.updateTicketStatus(oldTicket.TicketId, "closed");
    }

    // Updating nexTicket CounterId to counterId
    await this.updateTicketCounter(nextTicket.TicketId, counterId);
    return Promise.resolve(nextTicket);
  }

  async getWaitingTime(ticket) {
    let serviceId = ticket.ServiceId;
    let Tr = await ServiceManager.serviceRowByAttribute("ServiceId", serviceId).then((service) => service.ServiceTime);      
    let Nr = await this.loadAllTicketsByAttribute("ServiceId", serviceId).then((queueNr) => queueNr.length-1);
    let counters = await CounterManager.loadAllCounters(); 
    let counterServiceIds = counters.reduce((prev, cur) => {
      prev[cur.CounterId] = prev[cur.CounterId] || [];
      prev[cur.CounterId].push(cur.ServiceId);
      return prev;
    }, {});
    counters = [...new Set(counters.map(counter => counter.CounterId))];
    let sum = 0;  
    for (const i of counters) {   
      sum += (1/counterServiceIds[i].length) * (counterServiceIds[i].includes(serviceId) ? 1 : 0);
    }
    let result = Tr * ((Nr/sum) + 0.5);
    return Promise.resolve(result);         
  }
}

module.exports = new TicketManager();
