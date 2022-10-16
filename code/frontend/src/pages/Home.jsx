import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const Home = (props) => {
    const [service, setService] = useState(props.serviceList[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        //API.newTicket(service);
        //redirect
    }

    return (
        <div className="text-center">
            <h1 className="font-weight-bold">Welcome to <span className="text-primary">OfficeQueueManager</span></h1>
            <h2>Select a service and take your ticket</h2>
            <Form onSubmit={handleSubmit} className="my-2">
                <Form.Select onChange={(event) => setService(event.target.value)}>
                    {props.serviceList.map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
                <Button variant="primary" type="submit" className='py-2 px-5 my-3'>Take your ticket</Button>
            </Form>
        </div>
    );
}

export default Home;