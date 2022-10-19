const PersistentManager = require("../../dao/PersistentManager");
const TicketManager = require("../../controllers/TicketManager");

describe("Add Ticket", () => {
  const CreateTime = "2021-11-11 08:09:20";
  const ServiceId = 1;
  const Status = "issued";
  const CounterId = 0;

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
});
