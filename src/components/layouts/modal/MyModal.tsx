import { Button, Modal } from 'react-bootstrap'
import { FC } from 'react'
import { TypeSetState } from '../../../utils/interface/CommonInterface'


interface iMyModal {
    title: string,
    children: React.ReactNode,
    show: boolean,
    setShow: TypeSetState<boolean>,
    onSubmit: () => void
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