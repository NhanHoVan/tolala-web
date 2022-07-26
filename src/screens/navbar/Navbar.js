import { faHome, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = (prop) => {
    

    return (
        <div className="navbar">
            <Link to='/'><h1 className="title_page">Tolala</h1></Link>
            <div className='display_flex_right'>
                <ul>
                    <li style={{backgroundColor: prop.selected === "isHome" ? '#F26618':'',}}>
                        <NavLink to='/'>
                            <FontAwesomeIcon className='icon' icon={faHome}/>
                        </NavLink>
                    </li>
                    <li style={{backgroundColor: prop.selected === "isFriends" ? '#F26618':'',}}>
                        <Link to='/friends'>
                            <FontAwesomeIcon className='icon' icon={faUserGroup}/>
                        </Link>
                    </li>
                    <li style={{backgroundColor: prop.selected === "isMessenger" ? '#F26618':'',}}>
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