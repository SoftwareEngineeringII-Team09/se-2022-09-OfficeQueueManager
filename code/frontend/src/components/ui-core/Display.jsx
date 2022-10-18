const Display = ({ service }) => {
    return (
        <div className="bg-primary bg-opacity-25 rounded-3 p-4 text-center">
            <h1 className="fs-2 fw-bold text-primary">{service.name}</h1>
            <div className="d-flex flex-column text-primary fw-bold opacity-50">
                <span className="fs-4">In Queue</span>
                <span className="fs-1">{service.queue.length}</span>
            </div>
            <div className="py-4">
                {service.queue.map(ticket =>
                    <div className="d-flex justify-content-between fs-4 text-primary fw-bold px-5 ">
                        <span>Ticket #{ticket.code}</span>
                        <span>Counter #{ticket.counter}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Display;