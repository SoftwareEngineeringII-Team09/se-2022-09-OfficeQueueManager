const chai = require("chai");
const chaiHttp = require("chai-http");
const Ticket = require("../dao/model/Ticket");
const { clearAll } = require("./utils");

chai.use(chaiHttp);
chai.should();

const app = require("../index");
const CounterManager = require("../controllers/CounterManager");
const ServiceManager = require("../controllers/ServiceManager");
const TicketManager = require("../controllers/TicketManager");
let agent = chai.request.agent(app);

describe("Test Service APIs", function () {
  /* Test Setup */
  this.beforeAll(clearAll);
  /* Test Teardown */
  this.afterAll(clearAll);

  const firstCounter = 1;
  const counterWithNoTickets = 3;
  const neverAskedService = 3;
  const createTime1 = "2022-10-10 00:00:00";
  const createTime2 = "2022-10-10 11:11:11";
  const createTime3 = "2022-10-10 22:22:22";
  const status = "issued";
  const tickets = [];
  let firstService = 0;

  this.beforeAll(async () => {
    // Define services
    firstService = await ServiceManager.defineService("Service 1", 10);
    ans = await ServiceManager.loadAllServices();
    // Define counters
    return Promise.all([
      CounterManager.defineCounter(firstCounter, firstService),

      CounterManager.defineCounter(counterWithNoTickets, neverAskedService),
    ]);
  });

  it("Should get services", (done) => {
    agent.get(`/api/services/`).then(function (res) {
      res.should.have.status(200);
      res.body.should.have.property("services");
      res.body.services.should.deep.equal(ans);
      done();
    });
  });
});
