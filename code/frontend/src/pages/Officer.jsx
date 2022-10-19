import { useState } from "react";

import { Button } from "react-bootstrap";

const Officer = () => {
    const [session, setSession] = useState({
        counter: 0,
        currentTicket: 0
    });

    const handleClick = (e) => {
        e.preventDefault();
        
        // ----- TODO: Replace with API
        setSession((old) => ({...old, currentTicket: old.currentTicket + 1}))
    }

    return (
        <div>
            <div className="mb-3">
                <span className="fs-3 fw-black opacity-50">Counter #{session.counter}</span>
                <h1 className="fw-black" style={{ fontSize: "64px" }}>Current Ticket #{session.currentTicket}</h1>
            </div>
            <Button variant="primary" size="lg" onClick={handleClick}>
                Call next customer
            </Button>
        </div>
    )
}

export default Officer;