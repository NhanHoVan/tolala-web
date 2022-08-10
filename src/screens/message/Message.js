import React from "react";
import { useParams } from "react-router-dom";

const Message = () => {
    const {id} = useParams();
    
    return (
        <h1>Page message - {id}</h1>
    );
}
 
export default Message;