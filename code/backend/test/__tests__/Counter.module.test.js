const PersistentManager = require("../../dao/PersistentManager");
const CounterManager = require("../../controllers/CounterManager");

describe("Add Counter", () => {
  let lastId = 0;
  let CounterId = 10;
  let ServiceId = 10;
  test("defineCounter", async () => {
    lastId = await CounterManager.defineCounter(CounterId, ServiceId);
    const newCounter = await PersistentManager.loadOneByAttribute(
      "Counter",
      "CounterId",
      CounterId
    );

    const expected = {
      CounterId: CounterId,
      ServiceId: ServiceId,
    };
    expect(newCounter).toEqual(expected);
  });

  test("updateCounter", async () => {
    const updateServiceId = 12;

    await CounterManager.updateCounter(CounterId, updateServiceId);
    const updateCounter = await PersistentManager.loadOneByAttribute(
      "Counter",
      "CounterId",
      CounterId
    );
    const expected = {
      CounterId: CounterId,
      ServiceId: updateServiceId,
    };
    expect(updateCounter).toEqual(expected);
  });

  test("delete Counter", async () => {
    let error = {
      code: 422,
      result: "No available Counter found ",
    };
    await CounterManager.deleteCounter(CounterId);
    expect(CounterManager.deleteCounter(CounterId)).rejects.toEqual(error);
  });
});
