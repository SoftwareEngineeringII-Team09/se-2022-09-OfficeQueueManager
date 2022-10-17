import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const Home = (props) => {
    const [service, setService] = useState(props.serviceList[0]);
    const [ticketNumber, setTicketNumber] = useState(-1);
    const [waitingTime, setWaitingTime] = useState('');

    const computeWaitingTime = (service, ticketNumber) => {
        //computation
        return '15m';
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //API.newTicket(service);
        setTicketNumber(1);
        setWaitingTime(computeWaitingTime(service, ticketNumber));
    }

    return (
        <div className="text-center">
            {ticketNumber < 0 ? <>
                <h1 className="font-weight-bold">Welcome to <span className="text-primary">OfficeQueueManager</span></h1>
                <h2>Select a service and take your ticket</h2>
                <Form onSubmit={handleSubmit} className="my-2">
                    <Form.Select onChange={(event) => setService(event.target.value)}>
                        {props.serviceList.map(s => <option key={s} value={s}>{s}</option>)}
                    </Form.Select>
                    <Button variant="primary" type="submit" className='py-2 px-5 my-3'>Take your ticket</Button>
                </Form>
            </> :
            <>
                <div>
                    <h1 className="font-weight-bold">This is your ticket code for <span className="text-primary">{service}</span></h1>
                    <h2>Your estimated waiting time is <span className='text-primary'>{waitingTime}</span></h2>
                </div>
                <div>
                    <h1 className="font-weight-bold">Ticket code <span className='text-primary'>#{ticketNumber}</span></h1>
                </div>
            </>
            }
        </div>
    );
}

export default Home;