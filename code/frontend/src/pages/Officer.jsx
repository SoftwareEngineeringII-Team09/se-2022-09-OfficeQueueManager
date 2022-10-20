import { useEffect } from "react";
import { useState } from "react";

import { Button } from "react-bootstrap";

import { toast } from "react-toastify";

import { api } from "../services";

const Officer = () => {
    const [session, setSession] = useState({
        counter: 1,
        currentTicket: undefined
    });

    useEffect(() => {
        api.getCurrentTicket(session.counter)
            .then(res => {
                setSession((old) => ({ ...old, currentTicket: res.ticket.TicketId }))
            })
            .catch((err) => {
                console.log(err)
                setSession((old) => ({ ...old, currentTicket: null }))
            })
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        api.getNextTicket(session.counter)
            .then(res => {
                setSession((old) => ({ ...old, currentTicket: res.ticket.TicketId }))
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 404)
                    setSession((old) => ({ ...old, currentTicket: null }))

                toast.error(err.message, {
                    theme: "colored"
                })
            })
    }

    return (
        <div className="px-4">
            <div className="mb-3">
                <span className="fs-3 fw-black opacity-50">Counter #{session.counter}</span>
                <h1 className="fw-black" style={{ fontSize: "64px" }}>
                    {session.currentTicket ? `Current Ticket #${session.currentTicket}` : "No customer to serve"}

                </h1>
            </div>
            <Button variant="primary" size="lg" onClick={handleClick}>
                Call next customer
            </Button>
        </div>
    )
}

export default Officer;