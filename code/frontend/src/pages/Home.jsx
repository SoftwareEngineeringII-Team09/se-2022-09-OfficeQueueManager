import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import api from '../services/api';
//import Input from '../components/ui-core/Input';

const Home = (props) => {
    const [service, setService] = useState('');
    const [serviceId, setServiceId] = useState(-1);
    const [ticketId, setTicketId] = useState(-1);
    const [waitingTime, setWaitingTime] = useState(-1);

    useEffect(() => {
        if(service === '' && props.serviceList.length !== 0){
            setService(props.serviceList[0].ServiceName);
            setServiceId(props.serviceList[0].ServiceId);
        }
    }, [props.serviceList])

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTicket = async (serviceId) => {
            try{
                const data = await api.postNewTicket(serviceId);
                setTicketId(data.ticket.TicketId);
                setWaitingTime(data.waitingTime);
            }
            catch(err){
                props.setErrMessage('Error while requiring a new ticket.')
            }
        }
        newTicket(serviceId);
    }

    const changeService = (event) => {
        const [name, id] = event.target.value.split(',');
        setService(name);
        setServiceId(id);
    }

    return (
        <div className="text-center">
            {ticketId < 0 ? <>
                <h1 className="font-weight-bold">Welcome to <span className="text-primary">OfficeQueueManager</span></h1>
                <h2>Select a service and take your ticket</h2>
                <Form onSubmit={handleSubmit} className="my-2">
                    <Form.Select onChange={changeService}>
                        {props.serviceList.map((s, id) => <option key={id} value={s.ServiceName + ',' + s.ServiceId}>{s.ServiceName}</option>)}
                    </Form.Select>
                    <Button variant="primary" type="submit" className='py-2 px-5 my-3'>Take your ticket</Button>
                </Form>
                {/*<Form onSubmit={handleSubmit} className="my-2">
                    <Input.Select id='selectServiceForNewTicket' name='serviceSelect' defaultValue={props.serviceList[0].label} options={props.serviceList} label='Service:' />
                    <Button variant="primary" type="submit" className='py-2 px-5 my-3'>Take your ticket</Button>
                </Form>*/}
            </> :
            <>
                <div>
                    <h1 className="font-weight-bold">This is your ticket code for <span className="text-primary">{service}</span></h1>
                    <h2>Your estimated waiting time is <span className='text-primary'>{waitingTime.toFixed(2)}</span> minutes.</h2>
                </div>
                <div>
                    <h1 className="font-weight-bold">Ticket code <span className='text-primary'>#{ticketId}</span></h1>
                </div>
            </>
            }
        </div>
    );
}

export default Home;