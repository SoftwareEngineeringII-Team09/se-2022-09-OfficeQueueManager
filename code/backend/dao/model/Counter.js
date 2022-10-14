"user strict";

class Counter {
  static tableName = "Counter";
  constructor(CounterId, ServiceId) {
    this.CounterId = CounterId;
    this.ServiceId = ServiceId;
  }
}

module.exports = Counter;
