"use strict";

const Service = require("../dao/model/Service");
const PersistentManager = require("../dao/PersistentManager");

class ServiceManager {
  constructor() {}

  async defineService(newServiceName, newServiceTime) {
    let exists = await PersistentManager.exists(
      Service.tableName,
      "ServiceName",
      newServiceName
    );
    if (exists) {
      return Promise.reject("422 Service Already exists");
    }

    const s = new Service(null, newServiceName, newServiceTime);
    return PersistentManager.store(Service.tableName, s);
  }

  async updateService(SerId, newServiceName, newServiceTime) {
    let exists = await PersistentManager.exists(
      Service.tableName,
      "ServiceId",
      SerId
    );
    if (!exists) {
      return Promise.reject("404 Service not exists");
    }

    return PersistentManager.update(
      Service.tableName,
      { Servicename: newServiceName, ServiceTime: newServiceTime },
      "ServiceId",
      SerId
    );
  }

  async deleteService(serId) {
    let exists = await PersistentManager.exists(
      Service.tableName,
      "ServiceId",
      serId
    );
    if (!exists) {
      return Promise.reject("422 No available Service found ");
    }

    return PersistentManager.delete(Service.tableName, "ServiceId", serId);
  }
}

module.exports = new ServiceManager();
