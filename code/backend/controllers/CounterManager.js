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
      return Promise.reject({
        code: 404,
        result: "Counter not exists",
      });
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
      return Promise.reject({
        code: 422,
        result: "No available Counter found ",
      });
    }

    return PersistentManager.delete(Counter.tableName, "CounterId", CounterId);
  }

  async loadAllCountersByAttribute(counterParameterName, value) {
    const counters = await PersistentManager.loadAllByAttribute(Counter.tableName, counterParameterName, value);
    if (counters.length === 0) {
      return Promise.reject(
        {
          code: 404,
          result: `No available Counter with ${counterParameterName} = ${value}`
        });
    }

    return Promise.resolve(counters);
  }

  async loadAllCounters() {
    let counters = await PersistentManager.loadAllRows(Counter.tableName);
    if (counters.length === 0) {
      return Promise.reject(
        {
          code: 404,
          result: "Counter table is empty",
        });
    }

    return Promise.resolve(counters);
  }
}

module.exports = new CounterManager();
