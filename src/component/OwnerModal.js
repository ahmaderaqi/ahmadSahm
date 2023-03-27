import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
function OwnerModal(props) {
    const [objData, setObjData] = useState({})

    const udpateFoodHandler = async (event) => {

        event.preventDefault();
        const obj = {
            quantity: event.target.quantity.value
        }

        const obj2 = {
            id: props.item.donationcard_id
        }
        const serverURl = `http://localhost:3003/donations/${obj2.id}`;
        const axiosRes = await axios.put(serverURl, obj);
        //props.closeOwnerModal();
        props.sendReq();
        props.closeOwnerModal()
    }
    

    return (
        <>
            <Modal show={props.isOwner} onHide={props.closeOwnerModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.item.item}</Modal.Title>
                </Modal.Header>

                <Form onSubmit={udpateFoodHandler}>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Quantity</Form.Label>
                        <Form.Control type="text" placeholder="insert a number" name='quantity' required />
                    </Form.Group>




                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>


                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeOwnerModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default OwnerModal;
