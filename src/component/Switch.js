import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
function Switch(){
  const { user } = useAuth0();
  const[users,setUsers]=useState({})

  const fun=()=>{
    setUsers(user);
    console.log(user)
  }

  useEffect(() => {
    fun();
}, [])

  return(
    <>

    <p>
      
    </p>
    
    </>
  )
}

export default Switch;