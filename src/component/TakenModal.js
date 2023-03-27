import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
function TakenModal(props) {

    const { user } = useAuth0();

    const transferItemHandler=async(event)=>{
        event.preventDefault();
        const obj = {
            fullName: user.email,
            phonNumber: event.target.phone.value,
            locationOf: event.target.location.value
        }
        

            const serverURL = `http://localhost:3003`;
            const response = await axios.post(`${serverURL}/takenitems`, obj);

            const obj2 = {
                id: props.item.donationcard_id
            }
            const serverURl = `http://localhost:3003/donations/${obj2.id}`;
            const axiosRes = await axios.delete(serverURl);

            console.log("deleted")
            console.log(props.item.takenDonations_id)
            //props.closeOwnerModal();
            props.closeTakenModal();
            props.sendReq();
            

    }
    return (
        <>
            <Modal show={props.takenClicked} onHide={props.closeTakenModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.item.item}</Modal.Title>
                </Modal.Header>

                <Form onSubmit={transferItemHandler} >
                    

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="insert your number" name='phone' required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Insert your location" name='location' required />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                    bon appetit
                    </Button>
                </Form>


                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>


        </>
    );
}

export default TakenModal;
