import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Cards from "./Cards";
import OwnerModal from "./OwnerModal";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Donations() {

    const [donationArr, setDonationArr] = useState([]);//store data that come from database
    const { user } = useAuth0();


    const sendReq = async () => {
        const serverURL = `http://localhost:3003/donations`;
        const response = await fetch(serverURL);
        const data = await response.json();
        console.log(data)
        setDonationArr(data);
    }

    const autherization=async()=>{
        const obj={
            
            email:user.email,
            img:user.picture,
            username:user.name
        }
        console.log(user)

        const serverURL = `http://localhost:3003`;
        const response = await axios.post(`${serverURL}/user`, obj);
    }

    useEffect(() => {
        sendReq();
        autherization();
    }, [])







   
   


    return (
        <>
            <Row xs={1} md={4} className="g-4">
                {donationArr.map((item) => {
                    return <Col  >
                        <Cards item={item}  sendReq={sendReq}  />
                    </Col>
                })}
            </Row>

            {/* <OwnerModal/> */}
        </>
       
    )
}

export default Donations