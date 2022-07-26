import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import './friends.css';

const Friends = () => {
    return (
        <div className="friends_page">
            <div className="title_page">
            </div>
            <div className="list_friends">
                <div className="bgr_friends">
                    <ul>
                        <li>
                            <div className='bgr_del_friend'>
                                <p>x</p>
                            </div>
                            <div className='display_flex'>
                                <div>
                                    <h2>Nguyen Van A</h2>
                                    <p>sologan</p>
                                </div>
                                <div>
                                    <Link to='/messenger/:idUser'>
                                        <FontAwesomeIcon className='icon' icon={faMessage}/>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Friends;