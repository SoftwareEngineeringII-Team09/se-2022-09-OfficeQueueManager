const PersistentManager = require("../../dao/PersistentManager");
const TicketManager = require("../../controllers/TicketManager");
const ServiceManager = require("../../controllers/ServiceManager");
const CounterManager = require("../../controllers/CounterManager");
const Service = require("../../dao/model/Service");
const Ticket = require("../../dao/model/Ticket");
const { clearAll } = require("../utils");

describe("Manage Ticket", () => {

  /* Test Setup */
  beforeAll(clearAll);
  /* Test Teardown */
  afterAll(clearAll);

  /* Test Data */
  const CreateTime = "19/10/2021 08:09:20";
  const ServiceId = 1;
  const Status = "issued";
  const CounterId = 1;
  const firstCounterId = 1;
  const noTicket = {
    code: 404,
    result: "Empty queues"
  };

  test("defineTicket", async () => {
    lastTicket = await TicketManager.defineTicket(
      CreateTime,
      ServiceId,
      Status,
      CounterId
    );
    const newTicket = await PersistentManager.loadOneByAttribute(
      "Ticket",
      "TicketId",
      lastTicket.TicketId
    );

    const expected = {
      TicketId: lastTicket.TicketId,
      CreateTime: CreateTime,
      ServiceId: ServiceId,
      Status: Status,
      CounterId: CounterId,
    };
    expect(newTicket).toEqual(expected);
  });

  test("updateTicketStatus", async () => {
    const updateStatus = "closed";

    await TicketManager.updateTicketStatus(lastTicket.TicketId, updateStatus);
    const updateTicket = await PersistentManager.loadOneByAttribute(
      "Ticket",
      "TicketId",
      lastTicket.TicketId
    );
    const expected = {
      TicketId: lastTicket.TicketId,
      CreateTime: CreateTime,
      ServiceId: ServiceId,
      Status: updateStatus,
      CounterId: CounterId,
    };
    expect(updateTicket).toEqual(expected);
  });

  test("nonExistingCounter", async () => {
    const nonExistingCounterId = 99;
    const noCounter = {
      "code": 404,
      "result": `No available Counter with CounterId = ${nonExistingCounterId}`,
    };
    const ticketToServe = TicketManager.getNextTicket(nonExistingCounterId);
    expect(ticketToServe).rejects.toEqual(noCounter);
  });

  test("emptyQueue", async () => {
    const nonUsedCounterId = 98;
    const nonRequestedServiceId = await ServiceManager.defineService("NonRequested", 100);
    await CounterManager.defineCounter(nonUsedCounterId, nonRequestedServiceId);
    const ticketToServe = TicketManager.getNextTicket(nonUsedCounterId);
    expect(ticketToServe).rejects.toEqual(noTicket);
  });

  test("queuesWithSameLength", async () => {

    const services = await defineCountersAndServices();
    const tickets = await defineTickets(services);
    const FirstTicketId = tickets[0].TicketId;
    const SecondTicketId = tickets[1].TicketId;

    // Next ticket should be associated to service with lowest time
    const ticketToServe1 = await TicketManager.getNextTicket(firstCounterId);
    expect(ticketToServe1).toEqual(tickets[1]);

    // Check status is closed
    const closedTicket1 = await PersistentManager.loadOneByAttribute(Ticket.tableName, "TicketId", SecondTicketId);
    expect(closedTicket1.Status).toEqual("closed");

    // Next ticket should be the only one remaining
    const ticketToServe2 = await TicketManager.getNextTicket(firstCounterId);
    expect(ticketToServe2).toEqual(tickets[0]);

    // Check status is closed
    const closedTicket2 = await PersistentManager.loadOneByAttribute(Ticket.tableName, "TicketId", FirstTicketId);
    expect(closedTicket2.Status).toEqual("closed");
  });

  test("queuesWithDifferentLengths", async () => {

    const firstServiceId = (await PersistentManager.loadOneByAttribute(Service.tableName, "ServiceName", "FirstService")).ServiceId;
    const secondServiceId = (await PersistentManager.loadOneByAttribute(Service.tableName, "ServiceName", "SecondService")).ServiceId;
    const tickets = await defineTickets([firstServiceId, secondServiceId]);
    const FirstTicketId = tickets[0].TicketId;
    const SecondTicketId = tickets[1].TicketId;

    const ThirdTicketId = (await TicketManager.defineTicket(
      CreateTime,
      firstServiceId,
      Status,
      0
    )).TicketId;

    const ticket3 = {
      TicketId: ThirdTicketId,
      CreateTime: CreateTime,
      ServiceId: firstServiceId,
      Status: Status,
      CounterId: firstCounterId
    };
    tickets.push(ticket3);

    // First serve the oldest ticket from the longest queue (FirstTicketId)
    // Than serve the ticket from the queue with the lowest time (SecondTicketId)
    // Finally serve the only ticket remaining (ThirdTicketId)
    for (let ticketId of [FirstTicketId, SecondTicketId, ThirdTicketId]) {

      // Call Next ticket
      const ticketToServe = await TicketManager.getNextTicket(firstCounterId);
      const expectedTicket = tickets.find((ticket) => ticket.TicketId === ticketId);
      expect(ticketToServe).toEqual(expectedTicket);

      // Check status is closed
      const closedTicket = await PersistentManager.loadOneByAttribute(Ticket.tableName, "TicketId", ticketId);
      expect(closedTicket.Status).toEqual("closed");
    }
  });

});

async function defineCountersAndServices() {

  // Define 2 services
  const firstServiceId = await ServiceManager.defineService("FirstService", 30);
  const secondServiceId = await ServiceManager.defineService("SecondService", 10);

  // Set first counter to serve both services
  const firstCounterId = 1;
  await CounterManager.defineCounter(firstCounterId, firstServiceId);
  await CounterManager.defineCounter(firstCounterId, secondServiceId);

  return [firstServiceId, secondServiceId];
}

async function defineTickets(servicesId) {

  const firstCounterId = 1;
  const CreateTime = "19/10/2021 08:09:20";
  const secondCreateTime = "10/10/2022 22:20:10";
  const Status = "issued";
  const firstServiceId = servicesId[0];
  const secondServiceId = servicesId[1];

  // Create a ticket for each service
  const FirstTicketId = (await TicketManager.defineTicket(CreateTime, firstServiceId, Status, 0)).TicketId;
  const SecondTicketId = (await TicketManager.defineTicket(secondCreateTime, secondServiceId, Status, 0)).TicketId;

  // Expected results
  const ticket1 = {
    TicketId: FirstTicketId,
    CreateTime: CreateTime,
    ServiceId: firstServiceId,
    Status: Status,
    CounterId: firstCounterId
  };
  const ticket2 = {
    TicketId: SecondTicketId,
    CreateTime: secondCreateTime,
    ServiceId: secondServiceId,
    Status: Status,
    CounterId: firstCounterId
  };

  return [ticket1, ticket2];
}
