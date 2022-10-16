const dayjs = require('dayjs');

function Ticket(number, service, timestamp, state){
    this.number = number;
    this.service = service;
    this.timestamp = dayjs(timestamp);
    this.state = state
}

export default Ticket;