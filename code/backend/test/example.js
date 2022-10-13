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
