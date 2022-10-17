const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const app = require('../index');
let agent = chai.request.agent(app);

describe("Example Integration Test", function () {

    it('It should Hello World!', function (done) {

        agent.get('/api/v1/example')
            .then(function (res) {
                res.should.have.status(200);
                res.text.should.equal('Hello World!');
                done();
            });
    });

});

function deleteAllTickets(agent) {
    describe('Removing all tickets', function () {
        it('Getting and removing', function (done) {
            agent.get('/api/tickets')
                .then(function (res) {
                    res.should.have.status(200);
                    for (let i = 0; i < res.body.length; i++)
                        agent.delete('/api/tickets/' + res.body[i].id)
                            .then(function (res2) {
                                res2.should.have.status(204);
                            });
                    done();
                })
                .catch(err => done(err));
        });
    });
}

function testTicket() {

    let ticket = .newSku('a', 'b', 20, 30, 40, 30);

    describe('Test Ticket CRUD features', () => {
        deleteAllTickets(agent);
        postNewTicket(agent, , 201);
        skus.testGetAllSkus(agent, mysku, 1, 200);
        skus.testGetSkuById(agent, null, 0, mysku, 422);
        skus.testEditSku(agent, myeditedskuToPut, null, 0, 422);
        skus.testGetSkuById(agent, null, 0, myeditedsku, 422);
        skus.testNewPosition(agent, p, null, 0, 422);
        skus.testDeleteSku(agent, null, 0, 204);
        skus.testGetAllSkus(agent, null, 0, 200);
        skus.testGetSkuById(agent, null, 0, null, 422);
        skus.testPostNewSku(agent, '{dd:s', 422);
        skus.testPostNewSku(agent, '<tag>345</tag>', 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', -50, 50, 50, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', 50, -50, 50, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', 50, 50, -50, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', 50, 50, 50, -50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', '', 50, 50, 50, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('', 'note', 50, 50, 50, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('skui', 'note', 50, 50, 50, 50), 201);
        skus.testPostNewSku(agent, skus.newSku('skui2', 'note', 50, 50, 50, 50), 201);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', 50, 50, 50.1, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', '50x', 50, 50, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', 50, '50x', 50, 50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', 50, 50, '50.1x', 50), 422);
        skus.testPostNewSku(agent, skus.newSku('sku', 'note', 50, 50, 50, '50x'), 422);
        skus.testGetSkuById(agent, 'w', null, null, 422);
        skus.testGetSkuById(agent, '$', null, null, 422);
        skus.deleteAllSkus(agent);
    });
}

testTicket();