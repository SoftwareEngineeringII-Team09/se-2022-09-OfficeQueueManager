"use strict";

const Counter = require("../dao/model/Counter");
const PersistentManager = require("../dao/PersistentManager");

class CounterManager {
  constructor() {}

  async defineCounter(newCounterId, newServiceId) {
    /* let exists = await PersistentManager.exists(
      Counter.tableName,
      {},
      newCounterName
    );
    if (exists) {
      return Promise.reject("422 Counter Already exists");
    }*/

    const c = new Counter(newCounterId, newServiceId);
    return PersistentManager.store(Counter.tableName, c);
  }

  async updateCounter(CounterId, newServiceId) {
    let exists = await PersistentManager.exists(
      Counter.tableName,
      "CounterId",
      CounterId
    );
    if (!exists) {
      return Promise.reject("404 Counter not exists");
    }

    return PersistentManager.update(
      Counter.tableName,
      { ServiceId: newServiceId },
      "CounterId",
      CounterId
    );
  }

  async deleteCounter(CounterId) {
    let exists = await PersistentManager.exists(
      Counter.tableName,
      "CounterId",
      CounterId
    );
    if (!exists) {
      return Promise.reject("422 No available Counter found ");
    }

    return PersistentManager.delete(Counter.tableName, "CounterId", CounterId);
  }
}

module.exports = new CounterManager();
