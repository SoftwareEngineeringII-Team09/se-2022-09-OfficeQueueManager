const chai = require('chai');
const chaiHttp = require('chai-http');
const Ticket = require('../dao/model/Ticket');
const PersistentManager = require('../dao/PersistentManager');

chai.use(chaiHttp);
chai.should();

const app = require('../index');
let agent = chai.request.agent(app);

describe("Test Ticket APIs", function () {

    // Delete all tickets before testing
    this.beforeAll( async () => {
        await PersistentManager.deleteAll("Ticket");
    });
    
    describe('Issue a new Ticket', () => {
        let ticket = new Ticket(1, "2022-10-10 10:11:12", 1, "Open", 1);
        // TODO: Test Calling next ticket
    });

    // Delete all tickets after testing
    this.afterAll( async () => {
        await PersistentManager.deleteAll("Ticket");
    });
});