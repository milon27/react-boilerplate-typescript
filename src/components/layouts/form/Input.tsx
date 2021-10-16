import { Form } from 'react-bootstrap';
import { FC } from 'react';
import { TypeOnChangeHandler } from '../../../utils/interface/CommonInterface';



interface iInput {
    title: string,
    value?: string,
    name: string,
    onChange: TypeOnChangeHandler,
    disabled: boolean,
    type: string
}

const Input: FC<iInput> = ({ title, value, name, onChange, disabled = false, type = "text" }) => {
    return (
        <>
            <Form.Group>
                <Form.Label>{title}</Form.Label>
                <Form.Control name={name} type={type} placeholder={title} value={value} disabled={disabled} onChange={onChange} required={true} />
            </Form.Group>
        </>
    )
}


export default Input