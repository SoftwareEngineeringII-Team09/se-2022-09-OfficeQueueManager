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
      return Promise.reject({
        code: 409,
        result: "Service Already exists",
      });
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
      return Promise.reject({
        code: 404,
        result: "Service not exists",
      });
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
      return Promise.reject({
        code: 404,
        result: "No available Service found",
      });
    }

    return PersistentManager.delete(Service.tableName, "ServiceId", serId);
  }

  async serviceRowByAttribute(serviceParameterName, value) {
    let exists = await PersistentManager.exists(
      Service.tableName,
      serviceParameterName,
      value
    );
    if (!exists) {
      return Promise.reject({
        code: 404,
        result: "No available Service found",
      });
    }

    return PersistentManager.loadOneByAttribute(
      Service.tableName,
      serviceParameterName,
      value
    );
  }

  async existService(SId) {
    let exists = await PersistentManager.exists(
      Service.tableName,
      "ServiceId",
      SId
    );
    if (!exists) {
      return Promise.reject({
        code: 404,
        result: "No available Service found",
      });
    }

    return Promise.resolve(exists);
  }

  async loadAllServices() {
    let services = await PersistentManager.loadAllRows(Service.tableName);
    if (services.length === 0) {
      return Promise.reject({
        code: 404,
        result: "Service table is empty",
      });
    }

    return Promise.resolve(services);
  }
}

module.exports = new ServiceManager();
