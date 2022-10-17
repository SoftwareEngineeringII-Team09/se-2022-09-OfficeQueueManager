"user strict";

class Service {
  static tableName = "Service";
  constructor(ServiceId, ServiceName, ServiceTime) {
    this.ServiceId = ServiceId;
    this.ServiceName = ServiceName;
    this.ServiceTime = ServiceTime;
  }
}

module.exports = Service;
