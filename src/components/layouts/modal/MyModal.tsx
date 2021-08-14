import { Button, Modal } from 'react-bootstrap'
import React, { FC } from 'react'
import { TypeOnEventHandler, TypeReactChild, TypeSetState } from '../../../utils/interface/CommonInterface'


interface iMyModal {
    title: string,
    children: TypeReactChild,
    show: boolean,
    setShow: TypeSetState<Boolean>,
    onSubmit: TypeOnEventHandler
}
const MyModal: FC<iMyModal> = ({ title, children, show, setShow, onSubmit }) => {

    return (
        <div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button onClick={onSubmit} variant="primary">Done</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyModal