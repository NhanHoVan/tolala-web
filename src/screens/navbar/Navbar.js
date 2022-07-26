import { faHome, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    
    return (
        <div className="navbar">
            <Link to='/'><h1 className="title_page">Tolala</h1></Link>
            <div className='display_flex_right'>
                <ul>
                    <li>
                        <Link to='/'>
                            <FontAwesomeIcon className='icon' icon={faHome}/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/friends'>
                            <FontAwesomeIcon className='icon' icon={faUserGroup}/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/messenger'>
                            <FontAwesomeIcon className='icon' icon={faMessage}/>
                        </Link>
                    </li>
                </ul>
                <div className='user_icon'>
                    <Link to='/user'>
                        <FontAwesomeIcon className='icon' icon={faUser}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;