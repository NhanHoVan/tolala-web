import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPaperPlane, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getUser } from "../utils/Common";
import './message.css';
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

const user = getUser();

const Message = (props) => {
    const {id} = useParams();
    const [friendInf, setFriendInf] = useState({});
    const [userInf, setUserInf] = useState({});

    useEffect(() => {
        for (const u of props.infUsers) {
            if ((u.id+"") === id) {
                setFriendInf(u);
            }
            if (u.id === user.id) {
                setUserInf(u);
            }
        }
    }, []);

    //show avata
    const showAvatar = (fInf) => {
        if (fInf.avatar === "") {
            return <FontAwesomeIcon className='icon' icon={faCircleUser}/>;
        }
        return <img src={fInf.avatar} alt="Friend profile."/>
    }

    return (
        <div className="bgr_mess">
            <div className="window_mess">
                <div className="header_window">
                    <div className="left">
                        <div className="img_friend">
                            { showAvatar(friendInf) }
                        </div>
                        <h3>{friendInf.name}</h3>
                    </div>
                    <FontAwesomeIcon icon={faEllipsis}/>
                </div>
                <div className="body_window"></div>
                <div className="footer_window">
                    <div className="input_text">
                        <input type="text" name="messInput" placeholder="Nhập tin nhắn ..."/>
                        <FontAwesomeIcon className='icon' icon={faFaceSmile}/>
                    </div>
                    <div className="btn_send">
                        <FontAwesomeIcon className='icon' icon={faPaperPlane}/>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default Message;