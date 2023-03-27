import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import OwnerModal from "./OwnerModal";
import Switch from "./Switch";
import axios from 'axios';
import LoginButton from "../LogIn/LogIn";
import TakenModal from "./TakenModal";
import { useAuth0 } from "@auth0/auth0-react";

function Cards(props) {
    const { user } = useAuth0();
    const { isAuthenticated } = useAuth0();

    const [isOwner, setIsOwner] = useState(false);// handling Owner
    const [isTaken, setIsTaken] = useState(false);// handling taken
    const [isHovering, setIsHovering] = useState(false);// handling hover
    const [takenClicked, setTakenClicked] = useState(false)


    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
        // setIsOwner(false)
    };



    const deleteHandler = async () => {
        const obj2 = {
            id: props.item.donationcard_id
        }
        const serverURl = `http://localhost:3003/donations/${obj2.id}`;
        const axiosRes = await axios.delete(serverURl);
        console.log("deleted")
        props.sendReq();
    }

    const takenClickedHandler = () => {
        setTakenClicked(true);
    }

    const ownerHandler = (e) => {
        //console.log(e.target.checked)
        setIsOwner(true)
    }

    const closeOwnerModal = () => {
        setIsOwner(false)
        setIsHovering(false)


    }

    const takenHandler = () => {
        setIsTaken(true)

    }

    const closeTakenModal = () => {
        setTakenClicked(false)
    }


    return (
        <>

            <Card onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.item.img} />

                <Card.Body>
                    <Card.Title>{props.item.item}</Card.Title>
                    <Card.Text>
                        <p>Number of people: {props.item.quantity}</p>
                        <p>Location : {props.item.locationof}</p>
                    </Card.Text>

                    {/* <Button variant="primary">Go somewhere</Button> */}
                    {isAuthenticated ?
                        <>
                            {isHovering ?
                                <>


                                    {user.email == props.item.email ? <>
                                        <Button variant="secondary" onClick={ownerHandler} >
                                            update
                                        </Button>

                                        <Button variant="danger" onClick={deleteHandler} >
                                            Delete
                                        </Button>
                                        <OwnerModal item={props.item} isOwner={isOwner} closeOwnerModal={closeOwnerModal} sendReq={props.sendReq} />

                                    </> :

                                        <div>
                                            <Button variant="secondary" onClick={takenClickedHandler} >
                                                Get
                                            </Button>

                                            <TakenModal sendReq={props.sendReq} takenClicked={takenClicked} item={props.item} closeTakenModal={closeTakenModal} />

                                        </div>




                                    }




                                    {/* <Button variant="primary">Update</Button>
                                    <Button variant="danger">Update</Button> */}
                                    {/* <Form >
                                <Form.Check
                                    type="switch"
                                    id="customswitch"
                                    label="Owner!"
                                    value={true}
                                    name="ahmad"
                                    onChange={ownerHandler}
                                />
                                {isOwner ? <OwnerModal deleteHandler={deleteHandler} item={props.item} isOwner={isOwner} closeOwnerModal={closeOwnerModal} sendReq={props.sendReq} />
                                :<>
                                <Button variant="primary" onClick={takenHandler}>Get it</Button>
                                <TakenModal sendReq={props.sendReq} isTaken={isTaken} item={props.item} closeTakenModal={closeTakenModal} />
                                    
                                </> 
                                }



                            </Form>
                             */}


                                </>

                                : ""
                            }

                        </>

                        : <>
                        {isHovering && !isAuthenticated?<>"you are not authentiacted, please"<LoginButton/></>:""}
                        </>}


                </Card.Body>

            </Card>
        </>
    )
}

export default Cards;



