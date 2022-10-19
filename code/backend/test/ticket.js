const chai = require('chai');
const chaiHttp = require('chai-http');
const Ticket = require('../dao/model/Ticket');
const {clearAll} = require("./utils");

chai.use(chaiHttp);
chai.should();

const app = require('../index');
const CounterManager = require('../controllers/CounterManager');
const ServiceManager = require('../controllers/ServiceManager');
const TicketManager = require('../controllers/TicketManager');
let agent = chai.request.agent(app);

describe("Test Ticket APIs", function () {

    /* Test Setup */
    this.beforeAll(clearAll);
    /* Test Teardown */
    this.afterAll(clearAll);
    
    describe('Issue a new Ticket', () => {
        let ticket = new Ticket(1, "2022-10-10 10:11:12", 1, "Open", 1);
    });

    describe('Call next Ticket', () => {

        const firstCounter = 1;
        const counterWithNoTickets = 3;
        const neverAskedService = 3;
        const createTime1 = "2022-10-10 00:00:00";
        const createTime2 = "2022-10-10 11:11:11";
        const createTime3 = "2022-10-10 22:22:22";
        const status = "issued";
        const tickets = [];

        this.beforeAll(async () => {
            // Define services
            const firstService = await ServiceManager.defineService("Service 1", 10);
            const secondService = await ServiceManager.defineService("Service 2", 20);
            // Define tickets
            tickets.push(await TicketManager.defineTicket(createTime1, firstService, status, 0));
            tickets.push(await TicketManager.defineTicket(createTime2, secondService, status, 0));
            tickets.push(await TicketManager.defineTicket(createTime3, secondService, status, 0));
            // Define counters
            return Promise.all([
                CounterManager.defineCounter(firstCounter, firstService),
                CounterManager.defineCounter(firstCounter, secondService),
                CounterManager.defineCounter(counterWithNoTickets, neverAskedService)
            ]);
        });

        it('Should provide error for Wrong Counter ID format', (done) => {
            agent.put('/api/tickets/WrongCounterIdFormat')
            .then(function (res) {
                res.should.have.status(422);
                res.body.should.have.property('error');
                res.body.error.should.have.property('value');
                res.body.error.should.have.property('msg');
                res.body.error.value.should.equal('WrongCounterIdFormat');
                res.body.error.msg.should.equal('Provide a valid counter id');
                done();
            });
        });

        it('Should provide error for Non-Existing Counter ID', (done) => {
            const nonExistingCounterId = 4;
            agent.put(`/api/tickets/${nonExistingCounterId}`)
            .then(function (res) {
                res.should.have.status(404);
                res.body.should.have.property('error');
                res.body.error.should.equal(`No available Counter with CounterId = ${nonExistingCounterId}`);
                done();
            });
        });

        it('Should return no ticket on empty queues', (done) => {
            agent.put(`/api/tickets/${counterWithNoTickets}`)
            .then(function (res) {
                res.should.have.status(404);
                res.body.should.have.property('error');
                res.body.error.should.equal('Empty queues');
                done();
            });
        });

        it('Should call next ticket from longest queue', (done) => {
            const expectedTicket = tickets[1];
            expectedTicket.CounterId = firstCounter;
            agent.put(`/api/tickets/${firstCounter}`)
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.have.property('ticket');
                res.body.ticket.should.deep.equal(expectedTicket);
                done();
            });
        });

        it('Should call lowest-service time ticket on equally long queues', (done) => {
            const expectedTicket = tickets[0];
            expectedTicket.CounterId = firstCounter;
            agent.put(`/api/tickets/${firstCounter}`)
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.have.property('ticket');
                res.body.ticket.should.deep.equal(expectedTicket);
                done();
            });
        });

        it('Should call next ticket the only remaining ticket', (done) => {
            const expectedTicket = tickets[2];
            expectedTicket.CounterId = firstCounter;
            agent.put(`/api/tickets/${firstCounter}`)
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.have.property('ticket');
                res.body.ticket.should.deep.equal(expectedTicket);
                done();
            });
        });

    });

});