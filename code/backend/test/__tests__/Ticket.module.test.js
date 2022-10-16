const PersistentManager = require("../../dao/PersistentManager");
const TicketManager = require("../../controllers/TicketManager");

describe("Add Ticket", () => {
  const CreateTime = "19/10/2021 08:09:20";
  const ServiceId = 1;
  const Status = "open";
  const CounterId = 1;
  let lastId = 0;

  test("defineTicket", async () => {
    lastId = await TicketManager.defineTicket(
      CreateTime,
      ServiceId,
      Status,
      CounterId
    );
    const newTicket = await PersistentManager.loadOneByAttribute(
      "Ticket",
      "TicketId",
      lastId
    );

    const expected = {
      TicketId: lastId,
      CreateTime: CreateTime,
      ServiceId: ServiceId,
      Status: Status,
      CounterId: CounterId,
    };
    expect(newTicket).toEqual(expected);
  });

  test("updateTicketStatus", async () => {
    const updateStatus = "closed";

    await TicketManager.updateTicketStatus(lastId, updateStatus);
    const updateTicket = await PersistentManager.loadOneByAttribute(
      "Ticket",
      "TicketId",
      lastId
    );
    const expected = {
      TicketId: lastId,
      CreateTime: CreateTime,
      ServiceId: ServiceId,
      Status: updateStatus,
      CounterId: CounterId,
    };
    expect(updateTicket).toEqual(expected);
  });
});
