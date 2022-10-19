import { Form } from "react-bootstrap";

const Field = ({ id, type, name, placeholder, label, className, ...props }) => {
    return (
        <Form.Group className={className} controlId={id}>
            <Form.Label className="fw-medium">{label}</Form.Label>
            <Form.Control id={id} type={type} name={name} placeholder={placeholder} className="rounded-3 p-3 bg-light border-0" />
            {
                props.children &&
                <Form.Text muted>
                    {props.children}
                </Form.Text>
            }
        </Form.Group>
    );
}

const Select = ({ id, name, defaultValue, options, label, className, ...props }) => {
    return (
        <Form.Group className={className} controlId={id}>
            <Form.Label className="fw-medium">{label}</Form.Label>
            <Form.Select name={name} defaultValue="default" className="rounded-3 p-3 bg-light border-0">
                <option value="default" disabled>{defaultValue}</option>
                {options.map((option, idx) =>
                    <option key={idx} value={option.value}>{option.label}</option>
                )}
            </Form.Select>
            {
                props.children &&
                <Form.Text muted>
                    {props.children}
                </Form.Text>
            }
        </Form.Group>
    );
}

const Input = { Field, Select };

export default Input;