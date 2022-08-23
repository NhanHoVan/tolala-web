import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPaperPlane, faEllipsis, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot, faCircleXmark, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { getUser } from "../utils/Common";
import axios from 'axios';
import './message.css';

const user = getUser();

const Message = (props) => {
    const {id} = useParams();
    const [messList, setMessList] = useState([]);
    const [loadMess, setLoadMess] = useState(false);
    const [friendInf, setFriendInf] = useState({});
    const [userInf, setUserInf] = useState({});
    const [mess, setMess] = useState({});
    const [messInput, setMessInput] =useState('');

    useEffect(() => {
        if (id !== null) {
            for (const u of props.infUsers) {
                if ((u.id+"") === id) {
                    setFriendInf(u);
                }
                if (u.id === user.id) {
                    setUserInf(u);
                }
            }
            setLoadMess(true);
        }
    }, []);

    //get list mess.
    const getMessengers = () => {
        axios.get('http://localhost:4000/messengers?userId='+userInf.id+'&friendId='+friendInf.id).then(response => {
            setMess(response.data.messReturn);
            setMessList(response.data.messReturn.listMess);
            setLoadMess(false);
        }).catch(e => {
            console.log("Get API Mess Error"+ e);
            setLoadMess(false);
        });
    }
    useEffect(() => {
        if (friendInf.id !== undefined && userInf.id !== undefined && loadMess === true) {
            getMessengers();
            console.log("a");
        }
    }, [loadMess])

    //send mess
    const senMessenger = () => {
        if (messInput !== '') {
            let data = JSON.stringify({
                'id': mess.id === undefined ? 0 : mess.id,
                'mess': messInput,
                'userId': userInf.id,
                'friendId': friendInf.id,
            });
    
            let configPost = {
                method: 'POST',
                url: 'http://localhost:4000/messengers/add-new-mess',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
    
            axios(configPost)
                .then((response) => {
                    setLoadMess(true);
                })
                .catch((e) => {
                    alert("Có lỗi xảy ra" + e)
                });
        }
        
    }

    //show avata
    const showAvatar = (fInf) => {
        if (fInf.avatar === "") {
            return <FontAwesomeIcon className='icon' icon={faCircleUser}/>;
        }
        return <img src={fInf.avatar} alt="Friend profile."/>
    }
    const showIcon = (mess) => {
        switch(mess.status) {
            case "0":
                if (mess.userId !== (user.id+"")) {
                    return <img src={friendInf.avatar} alt="Friend profile."/>;
                }
                return null;
            case "1":
                return <FontAwesomeIcon icon={faCircleCheck}/>;
            case "2":
                return <FontAwesomeIcon icon={faCircleDot}/>;
            default:
                return <FontAwesomeIcon icon={faCircleXmark}/>;
        }
        
            
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
                <div className="body_window">
                    { messList === null || messList.length === 0 ? <p>'Xin chào!' để bắt đầu câu chuyện.</p> : 
                    <ul>
                        { messList.map((mess) => (
                            <li key={mess.id} className={mess.userId === (user.id+"") ? ("align_right"): ("align_left")}>
                                <div className="display_flex">
                                    <div className="mess_status">
                                        {showIcon(mess)}
                                    </div>
                                    <div className="mess_content">
                                        <p>{mess.mess}</p>
                                    </div>
                                </div>
                                <div className="mess_inf">
                                    <p>{mess.createDate}</p>
                                </div>
                            </li>
                        )) }
                    </ul>
                    }
                </div>
                <div className="footer_window">
                    <div className="input_text">
                        <input type="text" name="messInput" placeholder="Nhập tin nhắn ..." onChange={(e)=> setMessInput(e.target.value)}/>
                        <FontAwesomeIcon className='icon' icon={faFaceSmile}/>
                    </div>
                    <div className="btn_send" onClick={senMessenger}>
                        <FontAwesomeIcon className='icon' icon={faPaperPlane}/>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default Message;